import { useCallback, useState } from 'react';
import { usePlugRouter } from './useContract';
import { estimatedGas } from '../utils';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { useSwapTokens } from '../store/swap/hooks';
import { parseCurrency } from '../utils/units';
import { useUserTransactionSetting } from '../store/user/hooks';
import useGetGasPrice from './useGetGasPrice';
import { NATIVE_TOKEN_ADDRESS } from 'config';
import { useAddSwapTransaction } from '../store/transactions/hook';

export enum SWAP_TRANSACTION_STATUS {
  WAITING,
  FAILED,
  COMPLETED,
  CANCELLED,
  REPLACED,
}

let log = console.log;

const useSwap = (
  exchangeId: string,
  swapCallData: string,
  toAmount: number,
): [SWAP_TRANSACTION_STATUS, () => void, () => Promise<void>, string] => {
  // store swap tx status
  let [swapTxStatus, setSwapTxStatus] = useState<SWAP_TRANSACTION_STATUS>(null);
  let [transactionHash, setTransactionHash] = useState<string>('');
  let plugRouter = usePlugRouter();
  let { account, library, chainId } = useWeb3React();
  let { fromToken, toToken, swapInputValue } = useSwapTokens();
  const addSwapTransaction = useAddSwapTransaction();

  // gas price derivation
  let { gasSpeedSelect } = useUserTransactionSetting();
  let gasPrices = useGetGasPrice();

  // gas price
  let gasPrice = gasPrices?.speeds[gasSpeedSelect]?.gasPrice;

  const transactionStatusSetNull = useCallback(() => {
    setSwapTxStatus(null);
  }, []);

  const swap = useCallback(async () => {
    try {
      if (!plugRouter || !swapCallData || !account || !gasPrice) return null;
      // set to swap loading
      setSwapTxStatus(SWAP_TRANSACTION_STATUS.WAITING);

      const amount = parseCurrency(swapInputValue, fromToken?.decimals);
      const value =
        fromToken?.address?.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase() ? amount : BigNumber.from('0');

      // try to estimate gas
      let gas = await estimatedGas(
        plugRouter,
        'swap',
        [
          ethers.constants.AddressZero,
          fromToken.address,
          parseCurrency(swapInputValue, fromToken.decimals),
          exchangeId,
          swapCallData,
        ],
        account,
        value,
      );

      // send swap transaction to blockchain
      let swapTx = await plugRouter
        .connect(library.getSigner())
        .swap(
          ethers.constants.AddressZero,
          fromToken.address,
          parseCurrency(swapInputValue, fromToken.decimals),
          exchangeId,
          swapCallData,
          {
            gasLimit: gas,
            gasPrice: ethers.utils.parseUnits(gasPrice.toString(), 9),
            value,
          },
        );

      setSwapTxStatus(SWAP_TRANSACTION_STATUS.COMPLETED);
      setTransactionHash(swapTx.hash);

      // insert the transaction
      addSwapTransaction({
        aggregatorId: exchangeId,
        fromToken,
        toToken,
        fromAmount: swapInputValue,
        toAmount,
        status: SWAP_TRANSACTION_STATUS.WAITING,
        txHash: swapTx.hash,
        chainId,
        time: parseInt((new Date().getTime() / 1000).toFixed(0)),
        account,
      });

      // error handling
    } catch (err) {
      if (err instanceof Error) {
        setSwapTxStatus(SWAP_TRANSACTION_STATUS.FAILED);
        log('Swap Error', err);
      }
    }
  }, [
    account,
    exchangeId,
    fromToken,
    swapInputValue,
    gasPrice,
    library,
    plugRouter,
    swapCallData,
    chainId,
    addSwapTransaction,
    toAmount,
    toToken,
  ]);

  return [swapTxStatus, transactionStatusSetNull, swap, transactionHash];
};

export default useSwap;
