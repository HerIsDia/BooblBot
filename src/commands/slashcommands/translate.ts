import { Client, CommandInteraction, User } from 'discord.js';
import { BooblUser, Translate } from '../../types';
import { errorEmbed } from '../../generators/embeds';
import { translateText } from '../../scripts/text';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const type: Translate = interaction.options.getSubcommand() as Translate;
  switch (type) {
    case 'text':
      translateText(interaction);
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
