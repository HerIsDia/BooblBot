import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} from '@discordjs/builders';
import { languagesSelectors } from '../languages';

// command "/about"
const about = new SlashCommandBuilder()
  .setName('about')
  .setDescription('ℹ️ About BooblBot.');

const translate = new SlashCommandBuilder()
  .setName('translate')
  .setDescription('🌏 Translating content using boobl !')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('text')
      .setDescription('✍️ Translate a text using BooblBot.')
      .addStringOption((str) =>
        str
          .setName('content')
          .setDescription('The text to translate.')
          .setRequired(true)
      )
      .addBooleanOption((bool) =>
        bool
          .setName('show')
          .setDescription('Do you want to make the translation public?')
          .setRequired(false)
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
          .setName('from')
          .setDescription('Choose the language series that will be used.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('message')
      .setDescription('📜 Translate a discord message using BooblBot by ID.')
      .addStringOption((str) =>
        str
          .setName('id')
          .setDescription('The ID of the message to translate.')
          .setRequired(true)
      )
      .addBooleanOption((bool) =>
        bool
          .setName('show')
          .setDescription('Do you want to make the translation public?')
          .setRequired(false)
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
          .setName('from')
          .setDescription('Choose the language series that will be used.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('wikipedia')
      .setDescription('📚 Translate a Wikipedia abstract using BooblBot.')
      .addStringOption((str) =>
        str
          .setName('topic')
          .setDescription('The topic to translate.')
          .setRequired(true)
      )
      .addBooleanOption((bool) =>
        bool
          .setName('show')
          .setDescription('Do you want to make the translation public?')
          .setRequired(false)
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
          .setName('from')
          .setDescription('Choose the language series that will be used.')
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('joke')
      .setDescription('🤣 Get a random joke using BooblBot and translate it.')
      .addStringOption((str) =>
        str
          .setName('language')
          .setDescription('The language of the joke.')
          .setRequired(false)
          .addChoice('French', 'fr')
          .addChoice('English', 'en')
      )
      .addBooleanOption((bool) =>
        bool
          .setName('show')
          .setDescription('Do you want to make the translation public?')
          .setRequired(false)
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
          .setName('from')
          .setDescription('Choose the language series that will be used.')
          .setRequired(false)
      )
  );

const translateApp = new ContextMenuCommandBuilder()
  .setType(3)
  .setName('translate');

const settings = new SlashCommandBuilder()
  .setName('settings')
  .setDescription('🔧 Open the settings menu.');

export const commands = [about, translate, translateApp, settings];
