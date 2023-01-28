import { Context, NarrowedContext } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import AppDataSource from './database';
import User from '../models/user';
import { commandsList, hearsList } from '../constants/commands';

type Ctx = NarrowedContext<
  Context<Update>,
  { message: Update.New & Update.NonChannel & Message.TextMessage; update_id: number }
>;

export async function startService(ctx: Ctx) {
  const userId = ctx.from.id;
  await ctx.reply(`
    hello, ${ctx.message?.from.first_name}
    `);
  if (!(<any>ctx).user) {
    const newUser = new User();
    newUser.id = userId;
    newUser.lang = 'en';
    await AppDataSource.manager.save(newUser);
  }
  // Hello, ${ctx.message?.from.first_name}\nI'm @${ctx.me}, I can advise you to choose a movie to watch.
}

export async function helpService(ctx: Ctx) {
  const title = "<b>Help</b>\nMy name is remo. i'm your guide to choose the right movie.\n\n";
  const commandsListText =
    '<b>Helpful commands:</b>\n' + commandsList.map((c) => `${c.name}: ${c.description}\n`).join('');
  const hearsListText =
    '\n\n<b>How to use remo:</b>\n' + hearsList.map((c) => `${c.name}: ${c.description}\n`).join('');
  await ctx.replyWithHTML(title + commandsListText + hearsListText);
}

export async function changeLanguage(ctx: Ctx) {
  await ctx.reply('Choose Language', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Arabic', callback_data: 'change_lang:ar' },
          { text: 'English', callback_data: 'change_lang:en' },
        ],
        [{ text: '❌', callback_data: 'cancel_delete' }],
      ],
    },
  });
  // Hello, ${ctx.message?.from.first_name}\nI'm @${ctx.me}, I can advise you to choose a movie to watch.
}
