import { CommandInteraction } from 'discord.js';
import { readFileSync } from 'fs';
import { errorEmbed } from '../../generators/embeds';
import { BooblServer, Language, Serie, SerieName } from '../../types';
import { process } from '../process';
import wiki, { Page } from 'wikipedia';

export const translateWikipedia = async (interaction: CommandInteraction) => {
  const serverID = interaction.guild?.id;
  const settingsServer: BooblServer = JSON.parse(
    readFileSync(`./data/servers/${serverID}.json`, 'utf8')
  );
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

  const to: Language =
    (interaction.options.getString('to') as Language | undefined) ||
    settingsServer.defaultLanguage;
  const serie: SerieName =
    (interaction.options.getString('serie') as SerieName | undefined) ||
    'The default';
  const userID = interaction.user.id;
  const canBeVisible = settingsServer.share;
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
