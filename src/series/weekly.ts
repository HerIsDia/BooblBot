import { languages } from '../languages';
import { Language } from '../types';

let lastWeeklyDate = new Date(0);
let weeklyLanguages: Language[] = [];

const getWeekNumber = (date: Date) => {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  return weekNo;
};

module.exports = {
  name: 'The weekly',
  description: 'Translate a text with a serie than change every week',
  emoji: '📅',
  languages: () => {
    const currentDate = new Date();
    if (getWeekNumber(currentDate) !== getWeekNumber(lastWeeklyDate)) {
      weeklyLanguages = [];
      const weekNumber = getWeekNumber(currentDate);
      let numberOfLanguage = weekNumber * 4 - (26 - weekNumber);
      numberOfLanguage < 0
        ? (numberOfLanguage = numberOfLanguage * -1)
        : (numberOfLanguage = numberOfLanguage);
      numberOfLanguage = (numberOfLanguage % 69) + 10;

      for (let index = 0; index < numberOfLanguage; index++) {
        const random = Math.floor(Math.random() * languages.length);
        weeklyLanguages.push(languages[random]);
      }

      lastWeeklyDate = currentDate;
    }
    return weeklyLanguages;
  },
};
