import { Embed } from '@discordjs/builders';
import { User } from 'discord.js';
import { inProgressNumber } from '../scripts/progressBar';
import { BooblEmbed, Translate } from '../types';

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

export const errorEmbed = (title: string, description: string) => {
  return new Embed()
    .setTitle(title)
    .setDescription(description)
    .setColor(13854074)
    .setTimestamp(new Date());
};

export const translateEmbed = (options: BooblEmbed) => {
  return new Embed()
    .setTitle(
      options.end
        ? 'Your translation has been translated.'
        : 'Your translation is in progress.'
    )
    .setDescription(
      options.end
        ? `Your text has been translated in __${
            options.languages.length
          }__ languages in a row with __${
            options.serie
          }__ serie.\nThe result is in __${
            options.languages[options.languages.length - 1]
          }__.`
        : `${
            inProgressNumber(options.progress, options.languages.length)
              .percentage2Digits
          }%. (${
            options.languages.length > options.progress
              ? options.languages[options.progress]
              : options.languages[options.languages.length - 1]
          })`
    )
    .setTimestamp(options.date)
    .setColor(options.end ? 11060870 : 15968018)
    .addField({
      name: 'from',
      value: `> ${options.start.replace(/\n/g, '\n> ')}`,
    })
    .addField({
      name: 'to',
      value: options.end
        ? `> ${options.end.replace(/\n/g, '\n> ')}`
        : `> ${
            inProgressNumber(options.progress, options.languages.length).allBar
          }`,
    })
    .setFooter({
      text: `ID: ${options.id}`,
    })
    .setAuthor({
      name: options.user.tag,
      iconURL:
        options.user.avatarURL({ format: 'png', dynamic: true }) != null
          ? (options.user.avatarURL({ format: 'png', dynamic: true }) as string)
          : 'https://cdn.discordapp.com/embed/avatars/0.png',
    });
};
