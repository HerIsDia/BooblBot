# BooblBot.

[![wakatime](https://wakatime.com/badge/github/diamantdev/BooblBot.svg?style=flat-square)](https://wakatime.com/badge/github/diamantdev/BooblBot)
[![GitHub stars](https://img.shields.io/github/stars/diamantdev/BooblBot?style=flat-square)](https://github.com/diamantdev/BooblBot/stargazers)
[![GitHub license](https://img.shields.io/github/license/diamantdev/BooblBot?style=flat-square)](https://github.com/diamantdev/BooblBot)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/diamantdev/BooblBot?style=flat-square)

Do you know what is Google translate ? Great tool isn't it ? But, what happen if you translate a text multiple time using Google translate ? This tool is so good than of course, everything should be fine, right ? Right ?

## About.

BooblBot is a discord bot who replace [Transhlate](https://github.com/diamantdev/transhlate) developped by @diamantdev (hello it's me.) using [my own template](https://github.com/diamantdev/BotTemplate).

The goal of this bot is to _translate_ text using google translate. ~~But each text is translated via a serie of language.~~

It is a fun discord bot who the purpose is to "translate" a text from a lot of different language to transform your text into a completly another text.

In other terms, this tool will put your text in a language A, the result will be in a language B, then the result will be in a language C, and so on, until you get your final text in a language choosen who absolutely not (or maybe, if you have some chance) be the same as the original text.

- **[Watch the trailer.](https://www.youtube.com/watch?v=_HSUw9mlG54)**
- **[Add BooblBot to your server.](https://discord.com/api/oauth2/authorize?client_id=926345095987470376&permissions=84992&scope=bot%20applications.commands)**

## Features.

- Translate text from a lot of language in a row using Google Translate.
- Can translate plain text, discord's messages, generated jokes or Wikipedia's summary.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Environment Variables

To run your own instance of the bot, you will need to add the following environment variables to your .env file. (Bold one are required.)

- **`TOKEN`**: Bot token.

- **`DISCORD_CLIENT_ID`**: Bot's application ID.

- **`TEKNIK_API_KEY`**: Teknik API Key, used to paste text if some text can't be rendered in an embed.

- `TEST_SERVER`: ID of a server of testing.

## Run Locally

Clone the project

```bash
  git clone https://github.com/diamantdev/BooblBot.git
```

Go to the project directory

```bash
  cd booblbot
```

Install dependencies

```bash
  npm install
```

Start the bot. **(Don't forget to do your .env file)**

```bash
  npm start
```
