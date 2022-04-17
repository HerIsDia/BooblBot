import { CommandInteraction } from 'discord.js';
import { readFileSync } from 'fs';
import { errorEmbed } from '../../generators/embeds';
import { BooblServer, Language, Serie, SerieName } from '../../types';
import { process } from '../process';
import wiki, { Page } from 'wikipedia';

export const translateWikipedia = async (
  interaction: CommandInteraction,
  serverID: string,
  to: Language,
  serie: SerieName,
  userID: string,
  canBeVisible: boolean
) => {
  const topic = interaction.options.getString('topic') as string;
  let original = '';
  let page = await wiki.page(topic).catch((err) => {
    return interaction.reply({
      embeds: [
        errorEmbed('Bad topic.', `${topic} don't exist on wikipedia, jeez.`),
      ],
    });
  });
  if (page) {
    let wikiText = await page.summary();
    while (wikiText.extract.toLowerCase().includes('may refer to:')) {
      const wikiRelated = await wiki.related(topic);
      const relatedLengh = wikiRelated.pages.length;
      const randomRelated = Math.floor(Math.random() * relatedLengh);
      wikiText = wikiRelated.pages[randomRelated];
    }
    original = wikiText.extract;
  }

  await process(
    {
      date: new Date(),
      serie,
      userID,
      text: { original },
      to,
      canBeVisible,
      serverID,
      translate: 'message',
    },
    interaction
  );
};
