import { CommandInteraction } from 'discord.js';
import wiki from 'wikipedia';
import { errorEmbed } from '../../generators/embeds';
import { Language } from '../../types';
import { process } from '../process';

export const translateWikipedia = async (
  interaction: CommandInteraction,
  serverID: string,
  to: Language,
  serie: string,
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
      ephemeral: true,
    });
  });
  if (page) {
    let wikiText = await page.summary();
    while (
      wikiText.extract.toLowerCase().includes('may refer to:') ||
      wikiText.extract.toLowerCase().includes('most often refers to:')
    ) {
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
      translate: 'wikipedia',
    },
    interaction
  );
};
