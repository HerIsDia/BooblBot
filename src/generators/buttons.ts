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
  if (options.shareButton)
    messageRow.addComponents(
      new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('Get shareable link')
        .setCustomId('share')
    );
  if (options.publishButton)
    messageRow.addComponents(
      new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('Publish on Notion')
        .setCustomId('publish')
    );
  if (options.notionURL)
    messageRow.addComponents(
      new MessageButton()
        .setStyle('LINK')
        .setLabel('Notion')
        .setURL(options.notionURL)
    );
  return messageRow;
};
