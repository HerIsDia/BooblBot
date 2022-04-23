import { MessageActionRow, MessageButton } from 'discord.js';
import { BooblTranslateButton } from '../types';

export const aboutEmbedButton = new MessageActionRow().addComponents(
  new MessageButton()
    .setStyle('LINK')
    .setLabel('Source code')
    .setURL('https://github.com/diamantdev/BooblBot')
);

export const booblTranslateButton = (options: BooblTranslateButton) => {
  const messageRow = new MessageActionRow();
  if (options.showButton)
    messageRow.addComponents(
      new MessageButton()
        .setStyle('PRIMARY')
        .setLabel('Send to the server')
        .setCustomId('show')
    );
  return messageRow;
};
