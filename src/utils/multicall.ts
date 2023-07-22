import { aggregate, ICall, IResponse } from '@makerdao/multicall';
import { CHAINS } from '../config/chains';
import { isEmpty } from 'lodash';

const multicall = async (chainId: number, calls: ICall[]): Promise<IResponse> => {
  if (isEmpty(calls)) return null;
  const results = await aggregate(calls, {
    rpcUrl: CHAINS[chainId].rpc_url,
    multicallAddress: CHAINS[chainId].multicallAddress,
  });
  return results as IResponse;
};

export default multicall;
