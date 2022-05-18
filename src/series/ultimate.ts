import { languages } from '../languages';
import { Language } from '../types';

module.exports = {
  name: 'The ultimate',
  description:
    'Translate a text with a serie of ALL of the available languages',
  emoji: '🚀',
  languages: () => {
    let languagesGenerated: Language[] = [];
    for (let index = 0; index < languages.length; index++) {
      languagesGenerated.push(languages[index]);
    }
    return languagesGenerated;
  },
};
