import Link from '../models/links';

import { Ctx } from '../types/telegraf';

const ADMIN_CHAT_ID = 551591135;

export async function sendLinkMovieAdmin(ctx: Ctx, link: Link) {
  await ctx.telegram.sendMessage(
    ADMIN_CHAT_ID,
    `from: ${link.userName}\nmovieId: ${link.movieId}\nmovie name: ${link.movieName}\nlink: ${link.url}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'accept', callback_data: `acc_link:${link.id}|${link.movieId}` },
            { text: '❌', callback_data: 'cancel' },
          ],
        ],
      },
    },
  );
}
