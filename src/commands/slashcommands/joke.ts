import { Client, CommandInteraction } from 'discord.js';
import { readdirSync, readFileSync } from 'fs';
import { errorEmbed } from '../../generators/embeds';
import { translateJoke } from '../../scripts/types/jokes';
import { BooblServer, Language } from '../../types';

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
  const serie: string = interaction.options.getString('serie') || 'The default';
  const userID = interaction.user.id;
  const canBeVisible = settingsServer.share;

  translateJoke(interaction, serverID, to, serie, userID, canBeVisible);
};
