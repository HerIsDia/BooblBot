import { MessageActionRow, MessageButton } from 'discord.js';

export const aboutEmbedButton = new MessageActionRow().addComponents(
  new MessageButton()
    .setStyle('LINK')
    .setLabel('Source code')
    .setURL('https://github.com/diamantdev/BooblBot')
);
