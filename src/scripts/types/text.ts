import { CommandInteraction } from 'discord.js';
import { errorEmbed } from '../../generators/embeds';
import { Language, SerieName } from '../../types';
import { process } from '../process';

export const translateText = async (
  interaction: CommandInteraction,
  serverID: string,
  to: Language,
  serie: SerieName,
  userID: string,
  canBeVisible: boolean
) => {
  const original = interaction.options.getString('content');
  if (!original)
    return interaction.reply({
      embeds: [errorEmbed('Missing value.', '`content` should not be empty.')],
    });
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
