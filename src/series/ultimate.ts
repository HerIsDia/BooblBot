import { languages } from '../languages';
import { Language } from '../types';

const generate = () => {
  let languagesGenerated: Language[] = [];
  for (let index = 0; index < languages.length; index++) {
    languagesGenerated.push(languages[index]);
  }
  return languagesGenerated;
};

module.exports = {
  name: 'The ultimate',
  description:
    'Translate a text with a serie of ALL of the available languages',
  emoji: '🚀',
  languages: generate(),
};
