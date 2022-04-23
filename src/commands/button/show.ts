import { Embed } from '@discordjs/builders';
import { Client, ButtonInteraction, TextChannel } from 'discord.js';
import { readFileSync } from 'fs';
import { BooblServer } from '../../types';

export const run = async (client: Client, interaction: ButtonInteraction) => {
  const { channel }: BooblServer = JSON.parse(
    readFileSync(
      `./data/servers/${interaction.guild?.id as string}.json`,
      'utf8'
    )
  );
  const guildChannel = interaction.guild?.channels.cache.get(
    channel
  ) as TextChannel;
  guildChannel.send({
    embeds: interaction.message.embeds as Embed[],
  });
  interaction.update({
    embeds: interaction.message.embeds as Embed[],
    components: [],
  });
};
