import { CommandInteraction } from 'discord.js';
import { errorEmbed } from '../../generators/embeds';
import { Language, SerieName } from '../../types';
import { process } from '../process';

export const translateID = async (
  interaction: CommandInteraction,
  serverID: string,
  to: Language,
  serie: SerieName,
  userID: string,
  canBeVisible: boolean
) => {
  const ID = interaction.options.getString('id') as string;
  let message = await interaction.channel?.messages.fetch(ID);
  if (!message)
    return interaction.reply({
      embeds: [
        errorEmbed(
          'Bad ID.',
          'The ID provided is not valid. Be sure than the ID of the message is on the channel and that the message is not deleted.'
        ),
      ],
    });
  await process(
    {
      date: new Date(),
      serie,
      userID,
      text: { original: message.content },
      to,
      canBeVisible,
      serverID,
      translate: 'message',
    },
    interaction
  );
};
