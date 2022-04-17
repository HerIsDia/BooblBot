import { Client, CommandInteraction } from 'discord.js';
import { Translate } from '../../types';
import { errorEmbed } from '../../generators/embeds';
import { translateText } from '../../scripts/types/text';
import { readdirSync } from 'fs';
import { translateID } from '../../scripts/types/id';
import { translateWikipedia } from '../../scripts/types/wiki';
import { translateJoke } from '../../scripts/types/jokes';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const eventFiles = readdirSync('./data/servers').filter((file) =>
    file.includes(interaction.guild?.id as string)
  );
  if (eventFiles.length === 0) {
    interaction.reply({
      embeds: [
        errorEmbed(
          'Server not set up yet.',
          "This server isn't setup yet. Please contact a server administrator to set it up via the `/setup` command."
        ),
      ],
      ephemeral: true,
    });
    return;
  }
  const type: Translate = interaction.options.getSubcommand() as Translate;
  switch (type) {
    case 'text':
      translateText(interaction);
      break;

    case 'message':
      translateID(interaction);
      break;

    case 'joke':
      translateJoke(interaction);
      break;

    case 'wikipedia':
      translateWikipedia(interaction);
      break;

    default:
      interaction.reply({
        embeds: [
          errorEmbed(
            'Invalid subcommand.',
            `The subcommand \`${type}\` does not exist or isn't ready yet.`
          ),
        ],
        ephemeral: true,
      });
      break;
  }
};
