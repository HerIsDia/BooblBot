// Import NPM Packages
import { Client, Intents } from 'discord.js';
import { readdirSync } from 'fs';
require('dotenv').config();

// Create Client and Set Intents
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES],
});
const token = process.env.TOKEN as string;

// Create interface for events handlers
interface EventHandler {
  name: string;
  once?: boolean;
  run: (...args: any[]) => void | Promise<void>;
}

const eventFiles = readdirSync('./src/events').filter((file) =>
  file.endsWith('.ts')
);

for (const file in eventFiles) {
  const event = require(`./events/${eventFiles[file]}`) as EventHandler;
  const { name, once, run } = event;
  if (once) {
    client.once(name, run);
  } else {
    client.on(name, run);
  }
}

client.login(token);
