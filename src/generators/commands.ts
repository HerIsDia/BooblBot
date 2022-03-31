import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} from '@discordjs/builders';

// command "/about"
const about = new SlashCommandBuilder()
  .setName('about')
  .setDescription('ℹ️ About BooblBot.');

export const commands = [about];
