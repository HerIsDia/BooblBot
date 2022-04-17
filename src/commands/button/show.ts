import { Embed } from '@discordjs/builders';
import {
  Client,
  ButtonInteraction,
  GuildBasedChannel,
  TextChannel,
} from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { booblTranslateButton } from '../../generators/buttons';
import { BooblMessage, BooblServer, BooblTranslateButton } from '../../types';

export const run = async (client: Client, interaction: ButtonInteraction) => {
  const messageID = interaction.message.embeds[0]?.footer?.text.substring(4);
  const messageFile = readFileSync(`./data/messages/${messageID}.json`, 'utf8');
  let message: BooblMessage = JSON.parse(messageFile);
  const { channel }: BooblServer = JSON.parse(
    readFileSync(`./data/servers/${message.serverID}.json`, 'utf8')
  );
  // const ServerID = message.serverID as string;
  let button = message.button as BooblTranslateButton;
  button = { ...button, showButton: false };
  const guildChannel = interaction.guild?.channels.cache.get(
    channel
  ) as TextChannel;
  guildChannel.send({
    embeds: interaction.message.embeds as Embed[],
    components: [booblTranslateButton(button)],
  });
  interaction.update({
    embeds: interaction.message.embeds as Embed[],
    components: [],
  });
  message = { ...message, button };
  writeFileSync(
    `./data/messages/${messageID}.json`,
    JSON.stringify(message),
    'utf8'
  );
};
