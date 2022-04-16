import axios from 'axios';
import FormData from 'form-data';
import { TeknikAPIResult } from '../types';
require('dotenv').config();

export const shortText = async (text: string) => {
  let headersList = {
    Accept: '*/*',
    Authorization: `AuthToken ${process.env.TEKNIK_API_KEY}`,
  };
  let response = await axios({
    method: 'POST',
    url: 'https://api.teknik.io/v1/Paste?code=' + encodeURI(text),
    headers: headersList,
  });
  const data: { result: TeknikAPIResult } = response.data;
  console.log(data.result);

  return data.result.url;
};
