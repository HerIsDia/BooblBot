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
    .setColor(5128583);
};

export const errorEmbed = (title: string, description: string) => {
  return new Embed()
    .setTitle(title)
    .setDescription(description)
    .setColor(12883865)
    .setTimestamp(new Date());
};

export const translateEmbed = (options: BooblEmbed) => {
  return new Embed()
    .setTitle(
      options.end
        ? `The ${
            options.type == 'wikipedia' ? 'wikipedia summary' : options.type
          } has been translated !`
        : 'In progress...'
    )
    .setDescription(
      `${
        options.end
          ? `In **${options.languages.length}** languages in a row.\nUsing __${options.serie}__ serie.`
          : `**Progression: ${options.progress + 1}/${
              options.languages.length
            }.**\n*Language: ${
              options.languages.length > options.progress
                ? options.languages[options.progress]
                : options.languages[options.languages.length - 1]
            }.*`
      }\nResult ${options.end ? ' ' : 'will be '}in __${
        options.languages[options.languages.length - 1]
      }__.`
    )
    .setTimestamp(options.date)
    .setColor(options.end ? 13361085 : 5875160)
    .addField({
      name: 'From:',
      value: `> ${options.start.replace(/\n/g, '\n> ')}`,
    })
    .addField({
      name: 'To:',
      value: options.end
        ? `> ${options.end.replace(/\n/g, '\n> ')}`
        : `> ${inProgressNumber(options.progress, options.languages.length)}`,
    })
    .setAuthor({
      name: options.user.tag,
      iconURL:
        options.user.avatarURL({ format: 'png', dynamic: true }) != null
          ? (options.user.avatarURL({ format: 'png', dynamic: true }) as string)
          : 'https://cdn.discordapp.com/embed/avatars/0.png',
    });
};
