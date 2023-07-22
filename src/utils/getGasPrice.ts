import axios from 'axios';

export interface Speed {
  acceptence: number;
  gasPrice: number;
  estimatedFee: number;
  speed: string;
}

interface GasPrice {
  time: number;
  speeds: {
    [key: string]: Speed;
  };
}

const getGasPrice = async (chainId: number): Promise<GasPrice> => {
  if (!chainId) return null;
  const response = await axios.get(`https://api.plug.exchange/api/gas?chainId=${chainId}`);

  const result = response?.data?.data;
  let speeds = {} as {
    [key: string]: Speed;
  };
  for (let i = 0; i < result?.speeds.length; i++) {
    speeds[result?.speeds[i].speed] = result?.speeds[i];
  }

  return { speeds, time: result?.time };
};

export default getGasPrice;
