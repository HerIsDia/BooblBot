import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  TextChannel,
} from 'discord.js';
import { readFileSync } from 'fs';
import { BooblServer, BooblTranslateButton } from '../types';

export const aboutEmbedButton = new MessageActionRow().addComponents(
  new MessageButton()
    .setStyle('LINK')
    .setLabel('Source code')
    .setURL('https://github.com/diamantdev/BooblBot')
);

export const booblTranslateButton = (
  options: BooblTranslateButton,
  interaction: CommandInteraction
) => {
  const { channel }: BooblServer = JSON.parse(
    readFileSync(
      `./data/servers/${interaction.guild?.id as string}.json`,
      'utf8'
    )
  );
  const guildChannel = interaction.guild?.channels.cache.get(
    channel
  ) as TextChannel;
  const messageRow = new MessageActionRow();
  if (options.showButton)
    messageRow.addComponents(
      new MessageButton()
        .setStyle('PRIMARY')
        .setLabel(`Share on #${guildChannel.name}`)
        .setCustomId('show')
        .setEmoji('🤣')
    );
  return messageRow;
};
