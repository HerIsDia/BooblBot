import axios from 'axios';
import { CommandInteraction } from 'discord.js';
import { errorEmbed } from '../../generators/embeds';
import { Language, SerieName } from '../../types';
import { process } from '../process';

export const translateJoke = async (
  interaction: CommandInteraction,
  serverID: string,
  to: Language,
  serie: SerieName,
  userID: string,
  canBeVisible: boolean
) => {
  const language = interaction.options.getString('language') as string;
  const jokes = await axios({
    method: 'get',
    url: `https://v2.jokeapi.dev/joke/Any?lang=${language}&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt`,
  });

  let original = (jokes.data as string).toString();

  if (!original)
    return interaction.reply({
      embeds: [
        errorEmbed(
          'Bad ID.',
          'The ID provided is not valid. Be sure than the ID of the message is on the channel and that the message is not deleted.'
        ),
      ],
    });
  await process(
    {
      date: new Date(),
      serie,
      userID,
      text: { original },
      to,
      canBeVisible,
      serverID,
      translate: 'joke',
    },
    interaction
  );
};
