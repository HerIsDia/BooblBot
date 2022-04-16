import { Language } from '../types';
import t from '@vitalets/google-translate-api';

export const translate = async (text: string, language: Language) => {
  const translation = await t(text, { to: language });
  return translation.text;
};
