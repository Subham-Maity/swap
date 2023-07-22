import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useERC20TokenContract } from './useContract';
import { estimatedGas } from '../utils';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { ERC20 } from '../config/contractTypes/ERC20';
import getAllowance from '../utils/getAllowance';

export enum ApprovalTransactionStatus {
  APPROVAL_LOADING,
  APPROVAL_CONFIRMED,
  APPROVAL_ERROR,
}

export interface ApprovalResponse {
  isApprovalRequired: boolean;
  approvalStatus: ApprovalTransactionStatus | undefined;
  triggeredApproval: () => Promise<void>;
}

const useAllowance = (token: ERC20, owner: string, spender: string): BigNumber | null | undefined => {
  let { data } = useSWR(`${owner}_${spender}_${token?.address}_allowance`, () => getAllowance(token, owner, spender), {
    refreshInterval: 10000,
  });
  return data;
};

export const useApproval = (spender: string, tokenId: string): ApprovalResponse => {
  let [isApprovalRequired, setApprovalRequired] = useState<boolean>(true);

  let [approvalStatus, setApprovalStatus] = useState<ApprovalTransactionStatus>();
  const { account, library } = useWeb3React();
  const tokenContract = useERC20TokenContract(tokenId);

  // allowance
  let allowance = useAllowance(tokenContract, account as string, spender);

  useEffect(() => {
    if (!allowance) return;
    if (allowance?.gt(0)) {
      setApprovalRequired(false);
    }
  }, [allowance]);

  const triggeredApproval = useCallback(async () => {
    try {
      if (account && tokenContract && spender) {
        setApprovalStatus(ApprovalTransactionStatus.APPROVAL_LOADING);

        let amount = ethers.constants.MaxUint256;
        const gasLimit = await estimatedGas(tokenContract, 'approve', [spender, amount], account);

        const transaction = await tokenContract.connect(library.getSigner()).approve(spender, amount, {
          from: account,
          gasLimit,
        });

        // waiting atleast two confirmation
        await transaction.wait(2);

        setApprovalRequired(false);
        setApprovalStatus(ApprovalTransactionStatus.APPROVAL_CONFIRMED);
      }
    } catch (err) {
      setApprovalStatus(ApprovalTransactionStatus.APPROVAL_ERROR);
    }
  }, [spender, library, tokenContract, account]);

  return {
    isApprovalRequired,
    approvalStatus,
    triggeredApproval,
  };
};
