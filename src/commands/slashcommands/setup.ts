import {
  Client,
  CommandInteraction,
  GuildBasedChannel,
  GuildMember,
} from 'discord.js';
import { writeFileSync } from 'fs';
import { errorEmbed } from '../../generators/embeds';
import { BooblServer, Language } from '../../types';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const serverID = interaction.guild?.id;
  if (!serverID) {
    interaction.reply({
      embeds: [
        errorEmbed(
          'You are not in a server!',
          'You need to be in a server to use this command!'
        ),
      ],
      ephemeral: true,
    });
    return;
  }
  const user = interaction.member;
  if (user === null) {
    interaction.reply({
      embeds: [
        errorEmbed(
          'You are not in a server!',
          'You need to be in a server to use this command!'
        ),
      ],
      ephemeral: true,
    });
    return;
  }
  const userServ = user as GuildMember;
  const userPerm = userServ.permissions.has('ADMINISTRATOR');
  if (!userPerm) {
    interaction.reply({
      embeds: [
        errorEmbed(
          'You do not have permission to use this command!',
          'You need to have the `ADMINISTRATOR` permission to use this command!'
        ),
      ],
      ephemeral: true,
    });
    return;
  }
  const showButton = interaction.options.getBoolean('showbutton') as boolean;
  const channel = interaction.options.getChannel(
    'channel'
  ) as GuildBasedChannel;
  const channelID = channel.id;
  const language: Language = interaction.options.getString(
    'language'
  ) as Language;
  const serverSetting: BooblServer = {
    channel: channelID,
    defaultLanguage: language,
    share: showButton,
  };
  writeFileSync(
    `./data/servers/${serverID}.json`,
    JSON.stringify(serverSetting)
  );
  interaction.reply({
    content: 'Setup complete! You can now use the `/translate` commands!',
    ephemeral: true,
  });
};
