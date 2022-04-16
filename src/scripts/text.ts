import { CommandInteraction } from 'discord.js';
import { errorEmbed } from '../generators/embeds';
import { Language, Serie, SerieName } from '../types';
import { process } from './process';

export const translateText = async (interaction: CommandInteraction) => {
  const original = interaction.options.getString('content');
  if (!original)
    return interaction.reply({
      embeds: [errorEmbed('Missing value.', '`content` should not be empty.')],
    });
  const to: Language =
    (interaction.options.getString('to') as Language | undefined) || 'English';
  const serie: SerieName =
    (interaction.options.getString('serie') as SerieName | undefined) ||
    'The default';
  const userID = interaction.user.id;
  const serverID = interaction.guild?.id;
  const inNotion = false;
  const isVisible = interaction.options.getBoolean('show') || false;
  const isPublish = false;

  await process(
    {
      date: new Date(),
      inNotion,
      isPublish,
      serie,
      userID,
      text: { original },
      to,
      isVisible,
      serverID,
      translate: 'text',
    },
    interaction
  );
};
