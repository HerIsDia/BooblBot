import { Language } from '../types';
import t from '@vitalets/google-translate-api';

export const translate = async (text: string, language: Language) => {
  try {
    const translation = await t(text, { to: language });
    return { error: false, text: translation.text };
  } catch (error) {
    return { error: true, text: error };
  }
};
