import { Embed } from '@discordjs/builders';
import { User } from 'discord.js';

export const aboutEmbed = (user: User) => {
  return new Embed()
    .setTitle('About BooblBot.')
    .setDescription(
      'BoobleBot is a bot made by <@!142723249355227138>. It is a bot that can be used to "translate" text into a chain of multiple languages.'
    )
    .setAuthor({
      name: user.username,
      iconURL: user.avatarURL() as string,
    })
    .setThumbnail(
      'https://media.discordapp.net/attachments/862742407925727283/958854744099676200/BooblBot.png'
    )
    .setColor(13854074);
};
