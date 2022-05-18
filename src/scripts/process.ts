import { CommandInteraction } from 'discord.js';
import { writeFileSync } from 'fs';
import { booblTranslateButton } from '../generators/buttons';
import { errorEmbed, translateEmbed } from '../generators/embeds';
import {
  BooblEmbed,
  BooblMessage,
  BooblTranslateButton,
  Serie,
} from '../types';
import { series } from './series';
import { shortText } from './shortText';
import { translate } from './translate';

export const process = async (
  message: BooblMessage,
  interaction: CommandInteraction
) => {
  const { text } = message;
  const { original } = text;
  const serie = series().find((serie) => serie.name === message.serie) as Serie;
  const languages = [...serie.languages()];
  languages.push(message.to);

  let embedOptions: BooblEmbed = {
    date: message.date,
    languages,
    start: original,
    serie: serie.name,
    id: '000000000000000000',
    progress: 0,
    user: interaction.user,
    type: message.translate,
  };

  let button: BooblTranslateButton | undefined;

  let progressText: string = original;

  if (progressText.length > 1024) {
    const url = await shortText(progressText);
    embedOptions.start = `Your text is too long to be showed in the embed. \n[Click here to see.](${url})`;
  }
  await interaction.reply({
    embeds: [translateEmbed(embedOptions)],
    ephemeral: true,
  });
  const reply = await interaction.fetchReply();
  embedOptions.id = reply.id;

  await interaction.editReply({
    embeds: [translateEmbed(embedOptions)],
  });

  for (let index = 0; index < languages.length; index++) {
    const text = await translate(progressText, languages[index]);
    if (text.error) {
      return interaction.editReply({
        embeds: [
          translateEmbed(embedOptions),
          errorEmbed(
            'Translation failed.',
            'Bad luck. Some translation can result as a failure due to the fact than the bot translate content through multiple language and so sometimes, all the language combined destroy the text.'
          ),
        ],
      });
    }
    progressText = text.text as string;
    embedOptions.progress++;
    if (embedOptions.progress !== languages.length) {
      await interaction.editReply({
        embeds: [translateEmbed(embedOptions)],
      });
    }
  }

  if (message.canBeVisible) button = { ...button, showButton: true };

  if (progressText.length > 1024) {
    const url = await shortText(progressText);
    embedOptions.end = `Your text is too long to be showed in the embed. \n[Click here to see.](${url})`;
  } else {
    embedOptions.end = progressText;
  }

  if (button) {
    await interaction.editReply({
      embeds: [translateEmbed(embedOptions)],
      components: [
        booblTranslateButton(button as BooblTranslateButton, interaction),
      ],
    });
  } else {
    await interaction.editReply({ embeds: [translateEmbed(embedOptions)] });
  }
};
