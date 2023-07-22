import { useCallback, useState } from 'react';
import { usePlugRouter } from './useContract';
import { estimatedGas } from '../utils';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import useGetGasPrice from './useGetGasPrice';
import { useXSwapState } from '../store/xswap/hook';
import { useUserTransactionSetting } from '../store/user/hooks';
import { parseCurrency } from '../utils/units';
import { NATIVE_TOKEN_ADDRESS } from '../config';
import { isEmpty } from 'lodash';

export enum XSWAP_TRANSACTION_STATUS {
  WAITING,
  FAILED,
  COMPLETED,
  CANCELLED,
  REPLACED,
}

interface XswapResponce {
  xswapTxStatus: XSWAP_TRANSACTION_STATUS;
  xswapCallback: () => Promise<void>;
  transactionHash: string;
}

const useXSwap = (
  exchangeId: string,
  bridgeId: string,
  swapCallData: string,
  bridgeCallData: string,
): XswapResponce => {
  const [xswapTxStatus, setXSwapTxStatus] = useState<XSWAP_TRANSACTION_STATUS>();
  const [transactionHash, setTransactionHash] = useState<string>('');
  let plugRouter = usePlugRouter();
  let { account, library } = useWeb3React();

  const { fromToken, xSwapInputValue } = useXSwapState();
  let { gasSpeedSelect } = useUserTransactionSetting();
  const gasPrices = useGetGasPrice();

  // gas price
  let gasPrice = gasPrices?.speeds[gasSpeedSelect]?.gasPrice;

  const xswapCallback = useCallback(async () => {
    try {
      if (
        !plugRouter ||
        !exchangeId ||
        !bridgeId ||
        !swapCallData ||
        !bridgeCallData ||
        !account ||
        !gasPrice ||
        isEmpty(fromToken)
      )
        return;
      // set to swap loading
      setXSwapTxStatus(XSWAP_TRANSACTION_STATUS.WAITING);

      const amount = parseCurrency(xSwapInputValue, fromToken?.decimals);
      const value =
        fromToken?.address?.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase() ? amount : BigNumber.from('0');

      /**
       * try to estimate gas
       * @params affiliateAddr, fromToken, amount, exchangeId, bridgeId, swapCallData, bridgeCallData
       * */
      let gas = await estimatedGas(
        plugRouter,
        'crossChainSwap',
        [
          ethers.constants.AddressZero,
          fromToken.address,
          parseCurrency(xSwapInputValue, fromToken?.decimals),
          exchangeId,
          bridgeId,
          swapCallData,
          bridgeCallData,
        ],
        account,
        value,
      );

      // send xswap transaction to blockchain
      let xswapTx = await plugRouter
        .connect(library.getSigner())
        .crossChainSwap(
          ethers.constants.AddressZero,
          fromToken.address,
          parseCurrency(xSwapInputValue, fromToken.decimals),
          exchangeId,
          bridgeId,
          swapCallData,
          bridgeCallData,
          {
            gasLimit: gas,
            gasPrice: ethers.utils.parseUnits(gasPrice.toString(), 9),
            value,
          },
        );

      setTransactionHash(xswapTx?.hash);
    } catch (err) {
      if (err instanceof Error) {
        console.log('useXSwap failed', err?.message);
      }
    }
  }, [
    plugRouter,
    swapCallData,
    xSwapInputValue,
    account,
    bridgeCallData,
    bridgeId,
    exchangeId,
    gasPrice,
    library,
    fromToken,
  ]);

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /** @ts-ignore */
    xswapTxStatus,
    xswapCallback,
    transactionHash: transactionHash,
  };
};

export default useXSwap;
