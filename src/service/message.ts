import { Context, NarrowedContext } from 'telegraf';
import Movies from '../lib/movies';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { splitMessageHears } from '../helpers/splitMessageHears';
import { TrendingTime } from '../types/movies';
import { renderListMoviesInChat, renderMovieInChat } from '../helpers/movie_interface';

type Ctx = NarrowedContext<
  Context<Update>,
  { message: Update.New & Update.NonChannel & Message.TextMessage; update_id: number }
>;

export async function getMovieFromMessage(ctx: Ctx) {
  try {
    console.log(ctx.from.first_name);
    console.log(ctx.message.text);
    const movieName = splitMessageHears(ctx.message.text);
    const m = new Movies((<any>ctx).user?.lang);
    const movie = await m.getMoviesByName(movieName);
    if (!movie) throw new Error();
    return renderMovieInChat(ctx, movie);
  } catch {
    ctx.reply('can not find this movie :(');
  }
}
export async function getMoviesListFromMessage(ctx: Ctx) {
  try {
    console.log(ctx.from.first_name);
    console.log(ctx.message.text);
    const nameSearch = splitMessageHears(ctx.message.text);
    const m = new Movies((<any>ctx).user?.lang);
    const movies = await m.getListMoviesByName(nameSearch);
    if (!movies || movies?.length === 0) throw new Error();
    return await renderListMoviesInChat(ctx, movies);
  } catch {
    ctx.reply('can not find this movie :(');
  }
}

export async function getTrendingMoviesListFromMessage(ctx: Ctx) {
  try {
    console.log(ctx.from.first_name);
    console.log(ctx.message.text);
    const time = splitMessageHears(ctx.message.text).toLowerCase();
    if (!['day', 'week'].includes(time)) {
      return await ctx.reply("Choose between 'day' or 'week'");
    }
    const m = new Movies((<any>ctx).user?.lang);
    const movies = await m.getTrendingMoviesList(time === 'day' ? TrendingTime.DAY : TrendingTime.WEEK);
    if (!movies || movies?.length === 0) throw new Error();
    return await renderListMoviesInChat(ctx, movies);
  } catch {
    return await ctx.reply('can not find this movie :(');
  }
}

export async function getRandomMovieFromMessage(ctx: Ctx) {
  try {
    console.log(ctx.from.first_name);
    console.log(ctx.message.text);
    const m = new Movies((<any>ctx).user?.lang);
    const movie = await m.getRandomMovie();
    if (!movie) throw new Error();
    return renderMovieInChat(ctx, movie);
  } catch {
    ctx.reply('can not find this movie :(');
  }
}
