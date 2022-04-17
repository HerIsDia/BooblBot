import { CommandInteraction } from 'discord.js';
import { readFileSync } from 'fs';
import { errorEmbed } from '../../generators/embeds';
import { BooblServer, Language, Serie, SerieName } from '../../types';
import { process } from '../process';

export const translateText = async (interaction: CommandInteraction) => {
  const serverID = interaction.guild?.id;
  const settingsServer: BooblServer = JSON.parse(
    readFileSync(`./data/servers/${serverID}.json`, 'utf8')
  );
  const original = interaction.options.getString('content');
  if (!original)
    return interaction.reply({
      embeds: [errorEmbed('Missing value.', '`content` should not be empty.')],
    });
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
      translate: 'text',
    },
    interaction
  );
};
