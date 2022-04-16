import { readdirSync } from 'fs';
import { Serie } from '../types';

export const series = () => {
  const seriesFiles = readdirSync('./src/series').filter((file) =>
    file.endsWith('.ts')
  );
  let series: Serie[] = [];
  for (const serieFile in seriesFiles) {
    const serie = require(`../series/${seriesFiles[serieFile]}`) as Serie;
    series.push(serie);
  }
  return series;
};
