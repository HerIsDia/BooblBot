import { CommandInteraction } from 'discord.js';
import { ByteLengthQueuingStrategy } from 'node:stream/web';
import { errorEmbed, translateEmbed } from '../generators/embeds';
import { BooblEmbed, BooblMessage, Serie, Translate } from '../types';
import { series } from './series';
import { translate } from './translate';

export const process = async (
  message: BooblMessage,
  interaction: CommandInteraction
) => {
  const { text } = message;
  const { original } = text;
  const serie = series().find((serie) => serie.name === message.serie) as Serie;
  const languages = serie.languages;
  languages.push(message.to);

  let embedOptions: BooblEmbed = {
    date: message.date,
    languages,
    start: original,
    serie: serie.name,
    id: '???',
    progress: 0,
    user: interaction.user,
    type: message.translate,
  };

  let progressText: string = original;

  await interaction.reply({
    embeds: [translateEmbed(embedOptions)],
    ephemeral: !message.isVisible,
  });
  const reply = await interaction.fetchReply();
  embedOptions.id = reply.id;

  await interaction.editReply({
    embeds: [translateEmbed(embedOptions)],
  });

  for (let index = 0; index < languages.length; index++) {
    const text = await translate(progressText, languages[index]);
    progressText = text;
    embedOptions.progress++;
    await interaction.editReply({
      embeds: [translateEmbed(embedOptions)],
    });
  }

  embedOptions.end = progressText;
  await interaction.editReply({
    embeds: [translateEmbed(embedOptions)],
  });
};
