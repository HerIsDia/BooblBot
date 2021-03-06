import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} from '@discordjs/builders';
import { languagesSelectors } from '../languages';
import { series } from '../scripts/series';

// command "/about"
const about = new SlashCommandBuilder()
  .setName('about')
  .setDescription('âšī¸ About BooblBot.');

const translateText = new SlashCommandBuilder()
  .setName('text')
  .setDescription('đ Translating content using boobl !')
  .addStringOption((str) =>
    str
      .setName('content')
      .setDescription('The text to translate.')
      .setRequired(true)
  )
  .addStringOption((str) =>
    str
      .setName('to')
      .setDescription('The latest language to translate to.')
      .setRequired(false)
      .addChoices(
        languagesSelectors.map((lang) => {
          return [lang, lang];
        })
      )
  )
  .addStringOption((str) =>
    str
      .setName('serie')
      .setDescription('Choose the language serie that will be used.')
      .setRequired(false)
      .addChoices(
        series().map((serie) => {
          return [
            `${serie.emoji ? `${serie.emoji} ` : ''}${serie.name}: ${
              serie.description
            }.`,
            serie.name,
          ];
        })
      )
  );

const translateMessage = new SlashCommandBuilder()
  .setName('message')
  .setDescription('đ Translate a discord message using BooblBot by ID.')
  .addStringOption((str) =>
    str
      .setName('id')
      .setDescription('The ID of the message to translate.')
      .setRequired(true)
  )
  .addStringOption((str) =>
    str
      .setName('to')
      .setDescription('The latest language to translate to.')
      .setRequired(false)
      .addChoices(
        languagesSelectors.map((lang) => {
          return [lang, lang];
        })
      )
  )
  .addStringOption((str) =>
    str
      .setName('serie')
      .setDescription('Choose the language series that will be used.')
      .setRequired(false)
      .addChoices(
        series().map((serie) => {
          return [
            `${serie.emoji ? `${serie.emoji} ` : ''}${serie.name}: ${
              serie.description
            }.`,
            serie.name,
          ];
        })
      )
  );

const translateWiki = new SlashCommandBuilder()
  .setName('wikipedia')
  .setDescription('đ Translate a Wikipedia abstract using BooblBot.')
  .addStringOption((str) =>
    str
      .setName('topic')
      .setDescription('The topic to translate.')
      .setRequired(true)
  )
  .addStringOption((str) =>
    str
      .setName('to')
      .setDescription('The latest language to translate to.')
      .setRequired(false)
      .addChoices(
        languagesSelectors.map((lang) => {
          return [lang, lang];
        })
      )
  )
  .addStringOption((str) =>
    str
      .setName('serie')
      .setDescription('Choose the language series that will be used.')
      .setRequired(false)
      .addChoices(
        series().map((serie) => {
          return [
            `${serie.emoji ? `${serie.emoji} ` : ''}${serie.name}: ${
              serie.description
            }.`,
            serie.name,
          ];
        })
      )
  );

const translateJoke = new SlashCommandBuilder()
  .setName('joke')
  .setDescription('đ¤Ŗ Get a random joke using BooblBot and translate it.')
  .addStringOption((str) =>
    str
      .setName('language')
      .setDescription('The language of the joke.')
      .setRequired(true)
      .addChoice('French', 'fr')
      .addChoice('English', 'en')
      .addChoice('Czech', 'cs')
      .addChoice('German', 'de')
      .addChoice('Spanish', 'es')
      .addChoice('Portuguese', 'pt')
  )
  .addStringOption((str) =>
    str
      .setName('to')
      .setDescription('The latest language to translate to.')
      .setRequired(false)
      .addChoices(
        languagesSelectors.map((lang) => {
          return [lang, lang];
        })
      )
  )
  .addStringOption((str) =>
    str
      .setName('serie')
      .setDescription('Choose the language series that will be used.')
      .setRequired(false)
      .addChoices(
        series().map((serie) => {
          return [
            `${serie.emoji ? `${serie.emoji} ` : ''}${serie.name}: ${
              serie.description
            }.`,
            serie.name,
          ];
        })
      )
  );

const settings = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('đ§ Setup the bot for the server.')
  .addBooleanOption((bool) =>
    bool
      .setName('showbutton')
      .setDescription(
        'đ§ Show the button to let user share they content using the bot.'
      )
      .setRequired(true)
  )
  .addChannelOption((channel) =>
    channel
      .setName('channel')
      .addChannelType(0)
      .setDescription(
        'đ§ The channel where the bot will post the translated content.'
      )
      .setRequired(true)
  )
  .addStringOption((str) =>
    str
      .setName('language')
      .setDescription('đ§ The language of all default translations.')
      .setRequired(true)
      .addChoices(
        languagesSelectors.map((lang) => {
          return [lang, lang];
        })
      )
  );

export const commands = [
  about,
  translateText,
  translateMessage,
  translateJoke,
  translateWiki,
  settings,
];
