import { BigNumber } from 'ethers';
import { ERC20 } from '../config/contractTypes/ERC20';

const getAllowance = async (tokenContract: ERC20, owner: string, spender: string): Promise<BigNumber | null> => {
  if (!tokenContract || !owner || !spender) return null;
  return await tokenContract.allowance(owner, spender);
};

export default getAllowance;
