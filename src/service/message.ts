import { Context, NarrowedContext } from 'telegraf';
import Movies from '../lib/movies';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { formatMovie, formatMovieLink } from '../lib/format';

type Ctx = NarrowedContext<
  Context<Update>,
  { message: Update.New & Update.NonChannel & Message.TextMessage; update_id: number }
>;

export async function getMovieFromMessage(ctx: Ctx) {
  try {
    const m = new Movies();
    const movie = await m.getMoviesByName(ctx.message.text);
    if (!movie) throw new Error();
    await ctx.replyWithHTML(formatMovie(movie));
    if (movie.poster_path) {
      await ctx.sendPhoto(formatMovieLink(movie.poster_path));
    }
  } catch {
    ctx.reply('can not find this movie :(');
  }
}
