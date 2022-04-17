import { CommandInteraction } from 'discord.js';
import { readFileSync } from 'fs';
import { errorEmbed } from '../../generators/embeds';
import { BooblServer, Language, Serie, SerieName } from '../../types';
import { process } from '../process';

export const translateID = async (interaction: CommandInteraction) => {
  const serverID = interaction.guild?.id;
  const settingsServer: BooblServer = JSON.parse(
    readFileSync(`./data/servers/${serverID}.json`, 'utf8')
  );
  const ID = interaction.options.getString('id') as string;
  let original = await interaction.channel?.messages.fetch(ID);

  if (!original)
    return interaction.reply({
      embeds: [
        errorEmbed(
          'Bad ID.',
          'The ID provided is not valid. Be sure than the ID of the message is on the channel and that the message is not deleted.'
        ),
      ],
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
      text: { original: original.content },
      to,
      canBeVisible,
      serverID,
      translate: 'message',
    },
    interaction
  );
};
