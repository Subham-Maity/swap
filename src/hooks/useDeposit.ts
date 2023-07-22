import { useCallback, useState } from 'react';
import { usePlugRouter } from './useContract';
import { estimatedGas } from '../utils';
import { ethers, BigNumber } from 'ethers';
import { useXSwapState } from '../store/xswap/hook';
import { parseCurrency } from '../utils/units';
import { NATIVE_TOKEN_ADDRESS } from '../config';
import { useWeb3React } from '@web3-react/core';
import useGetGasPrice from './useGetGasPrice';
import { useUserTransactionSetting } from '../store/user/hooks';

export enum DEPOSIT_TRANSACTION_STATUS {
  WAITING,
  FAILED,
  COMPLETED,
  CANCELLED,
  REPLACED,
}

export interface DepositResponse {
  depositTransactionStatus: DEPOSIT_TRANSACTION_STATUS;
  depositCallback: () => Promise<void>;
  transactionHash: string;
}

const useDeposit = (bridgeId: string, bridgeCallData: string): DepositResponse => {
  const [depositTransactionStatus, setDepositTransactionStatus] = useState<DEPOSIT_TRANSACTION_STATUS>();
  const [transactionHash, setTransactionHash] = useState<string>();
  const { account, library } = useWeb3React();
  let plugRouter = usePlugRouter();
  let { gasSpeedSelect } = useUserTransactionSetting();

  const { toToken, fromToken, xSwapInputValue } = useXSwapState();

  const gasPrices = useGetGasPrice();

  // gas price
  let gasPrice = gasPrices?.speeds[gasSpeedSelect]?.gasPrice;

  const depositCallback = useCallback(async () => {
    try {
      if (!plugRouter || !bridgeCallData || !account || !gasPrice) return;
      setDepositTransactionStatus(DEPOSIT_TRANSACTION_STATUS.WAITING);
      const amount = parseCurrency(xSwapInputValue, fromToken?.decimals);
      const value =
        fromToken?.address?.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase() ? amount : BigNumber.from('0');

      /**
       * estimate gas
       * @params  affiliateAddr, token, amount, bridgeId, bridgeCallData
       */
      let gas = await estimatedGas(
        plugRouter,
        'deposit',
        [
          ethers.constants.AddressZero,
          toToken?.address,
          parseCurrency(xSwapInputValue, fromToken.decimals),
          bridgeId,
          bridgeCallData,
        ],
        account,
        value,
      );

      // send deposit transaction to blockchain
      let depositTx = await plugRouter
        .connect(library.getSigner())
        .deposit(
          ethers.constants.AddressZero,
          toToken?.address,
          parseCurrency(xSwapInputValue, fromToken.decimals),
          bridgeId,
          bridgeCallData,
          {
            gasLimit: gas,
            gasPrice: ethers.utils.parseUnits(gasPrice.toString(), 9),
            value,
          },
        );

      setDepositTransactionStatus(DEPOSIT_TRANSACTION_STATUS.COMPLETED);
      setTransactionHash(depositTx.hash);
    } catch (err) {
      if (err instanceof Error) {
        console.log('useDeposit failed', err?.message);
      }
    }
  }, [
    account,
    bridgeCallData,
    bridgeId,
    fromToken?.address,
    gasPrice,
    library,
    fromToken?.decimals,
    plugRouter,
    toToken?.address,
    xSwapInputValue,
  ]);

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /** @ts-ignore */
    depositTransactionStatus,
    depositCallback,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /** @ts-ignore */
    transactionHash,
  };
};

export default useDeposit;
