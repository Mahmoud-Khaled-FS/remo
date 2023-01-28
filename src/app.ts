import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import botService from './commands/index';
import 'reflect-metadata';
import AppDataSource from './service/database';
config();

(async () => {
  const app = new Telegraf(process.env.BOT_TOKEN as string);
  app.use(botService);
  await AppDataSource.initialize();
  app.launch();
  process.once('SIGINT', () => app.stop('SIGINT'));
  process.once('SIGTERM', () => app.stop('SIGTERM'));
})();
