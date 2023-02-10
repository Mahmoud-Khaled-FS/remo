import { MovieData } from '../types/movies';
import { Ctx } from '../types/telegraf';

const ADMIN_CHAT_ID = 551591135;

export async function sendLinkMovieAdmin(ctx: Ctx, movie: MovieData) {
  await ctx.telegram.sendMessage(
    ADMIN_CHAT_ID,
    `from: ${ctx.from.first_name}\nmovieId: ${movie.id}\nmovie name: ${movie.original_title}\nlink: ${ctx.message.text}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'accept', callback_data: `acc_link:Link.message_id|${movie.id}` },
            { text: '❌', callback_data: 'cancel' },
          ],
        ],
      },
    },
  );
}
