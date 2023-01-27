import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import commands from './commands';
import hears from './hear';
config();

(async () => {
  const app = new Telegraf(process.env.BOT_TOKEN as string);
  app.use(commands);
  app.use(hears);
  app.launch();
  process.once('SIGINT', () => app.stop('SIGINT'));
  process.once('SIGTERM', () => app.stop('SIGTERM'));
})();
