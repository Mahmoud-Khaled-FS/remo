import { Context } from 'telegraf';

export function startService(ctx: Context) {
  ctx.reply(`
    Hello, ${ctx.message?.from.first_name}\nI'm @${ctx.me}, I can advise you to choose a movie to watch.
  `);
}
