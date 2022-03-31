import { Client, CommandInteraction } from 'discord.js';
import { aboutEmbedButton } from '../../generators/buttons';
import { aboutEmbed } from '../../generators/embeds';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const user = interaction.user;
  const embed = aboutEmbed(user);
  interaction.reply({
    embeds: [embed],
    components: [aboutEmbedButton],
    ephemeral: true,
  });
};
