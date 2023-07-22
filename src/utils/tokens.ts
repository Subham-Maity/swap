import { Token } from './../store/tokens';
import { PLUG_DEFAULT_TOKEN_LIST } from './../config/index';
import axios from 'axios';

export interface Tokenlist {
  tokens: Token;
}

export const getTokens = async (): Promise<Token[]> => {
  let tokenlistResults = await axios.get(PLUG_DEFAULT_TOKEN_LIST, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let results = tokenlistResults.data;
  return results.tokens;

};



