import { Client, CommandInteraction } from 'discord.js';
import { BooblServer, Language, SerieName, Translate } from '../../types';
import { errorEmbed } from '../../generators/embeds';
import { translateText } from '../../scripts/types/text';
import { readdirSync, readFileSync } from 'fs';
import { translateID } from '../../scripts/types/id';
import { translateWikipedia } from '../../scripts/types/wiki';
import { translateJoke } from '../../scripts/types/jokes';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const serverID = interaction.guild?.id as string;
  const eventFiles = readdirSync('./data/servers').filter((file) =>
    file.includes(serverID)
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

  const settingsServer: BooblServer = JSON.parse(
    readFileSync(`./data/servers/${serverID}.json`, 'utf8')
  );

  const to: Language =
    (interaction.options.getString('to') as Language | undefined) ||
    settingsServer.defaultLanguage;
  const serie: SerieName =
    (interaction.options.getString('serie') as SerieName | undefined) ||
    'The default';
  const userID = interaction.user.id;
  const canBeVisible = settingsServer.share;

  const type: Translate = interaction.options.getSubcommand() as Translate;
  switch (type) {
    case 'text':
      translateText(interaction, serverID, to, serie, userID, canBeVisible);
      break;

    case 'message':
      translateID(interaction, serverID, to, serie, userID, canBeVisible);
      break;

    case 'joke':
      translateJoke(interaction, serverID, to, serie, userID, canBeVisible);
      break;

    case 'wikipedia':
      translateWikipedia(
        interaction,
        serverID,
        to,
        serie,
        userID,
        canBeVisible
      );
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
