import { useWeb3React } from '@web3-react/core';
import { Contract, ContractInterface } from 'ethers';
import { useMemo } from 'react';
import { PLUG_ROUTER_CONTRACT_ADDRESSES } from '../config/contracts';

// abis
import ERC20ABI from '../config/abis/ERC20.json';
import PLUG_ROUTER_ABI from '../config/abis/PlugRouter.json';
import { PlugRouterUpgradeable } from '../config/contractTypes/PlugRouter';
import { ERC20 } from '../config/contractTypes/ERC20';

const useContract = (ABI: ContractInterface, contractAddress: string) => {
  let { library } = useWeb3React();
  return useMemo(() => {
    if (contractAddress && library) {
      return new Contract(contractAddress, ABI, library);
    } else return null;
  }, [ABI, contractAddress, library]);
};

export const useERC20TokenContract = (tokenContractAddress: string) => {
  return useContract(ERC20ABI, tokenContractAddress) as ERC20;
};

export const usePlugRouter = () => {
  let { chainId } = useWeb3React();
  return useContract(PLUG_ROUTER_ABI, PLUG_ROUTER_CONTRACT_ADDRESSES[chainId]) as PlugRouterUpgradeable;
};
