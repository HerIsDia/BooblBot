import { languages } from '../languages';
import { Language, Serie } from '../types';

module.exports = {
  name: 'The surprise',
  description:
    'Generate randomly a serie of languages between 10 and 100 languages',
  emoji: '🎲',
  languages: () => {
    const number = 10 + Math.floor(Math.random() * 90);
    let languagesGenerated: Language[] = [];
    for (let index = 0; index < number; index++) {
      const random = Math.floor(Math.random() * languages.length);
      languagesGenerated.push(languages[random]);
    }
    return languagesGenerated;
  },
};
