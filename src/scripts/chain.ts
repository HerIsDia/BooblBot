import { readdirSync } from 'fs';
import { Chain } from '../types';

export const chains = () => {
  const chainsFiles = readdirSync('./src/chains').filter((file) =>
    file.endsWith('.ts')
  );
  let chains: Chain[] = [];
  for (const chainFile in chainsFiles) {
    const chain = require(`../chains/${chainsFiles[chainFile]}`) as Chain;
    chains.push(chain);
  }
  return chains;
};
