import { Client, CommandInteraction, User } from 'discord.js';
import { BooblUser, Translate } from '../../types';
import { nanoid } from 'nanoid';
import { errorEmbed } from '../../generators/embeds';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const type: Translate = interaction.options.getSubcommand() as Translate;
  switch (type) {
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
