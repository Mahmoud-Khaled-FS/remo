import Movies from '../lib/movies';
import { splitMessageHears } from '../helpers/splitMessageHears';
import { TrendingTime } from '../types/movies';
import { renderGenresList, renderListMoviesInChat, renderMovieInChat } from '../helpers/movie_interface';
import AppDataSource from './database';
import { Ctx } from '../types/telegraf';
import { sendLinkMovieAdmin } from '../helpers/admin_message';

export async function getMovieFromMessage(ctx: Ctx) {
  try {
    const movieName = splitMessageHears(ctx.message.text);
    const m = new Movies((<any>ctx).user);
    const movie = await m.getMoviesByName(movieName);
    if (!movie) throw new Error();
    return renderMovieInChat(ctx, movie);
  } catch {
    ctx.reply('can not find this movie :(');
  }
}
export async function getMoviesListFromMessage(ctx: Ctx) {
  try {
    const nameSearch = splitMessageHears(ctx.message.text);
    const m = new Movies((<any>ctx).user);
    const movies = await m.getListMoviesByName(nameSearch);
    if (!movies || movies?.length === 0) throw new Error();
    return await renderListMoviesInChat(ctx, movies);
  } catch {
    ctx.reply('can not find this movie :(');
  }
}

export async function getTrendingMoviesListFromMessage(ctx: Ctx) {
  try {
    const time = splitMessageHears(ctx.message.text).toLowerCase();
    if (!['day', 'week'].includes(time)) {
      return await ctx.reply("Choose between 'day' or 'week'");
    }
    const m = new Movies((<any>ctx).user);
    const movies = await m.getTrendingMoviesList(time === 'day' ? TrendingTime.DAY : TrendingTime.WEEK);
    if (!movies || movies?.length === 0) throw new Error();
    return await renderListMoviesInChat(ctx, movies);
  } catch {
    return await ctx.reply('can not find this movie :(');
  }
}

export async function getRandomMovieFromMessage(ctx: Ctx) {
  try {
    const m = new Movies((<any>ctx).user);
    const movie = await m.getRandomMovie();
    if (!movie) throw new Error();
    return renderMovieInChat(ctx, movie);
  } catch {
    ctx.reply('can not find this movie :(');
  }
}
export async function getRandomMovieWithGenreFromMessage(ctx: Ctx) {
  try {
    const genreType = splitMessageHears(ctx.message.text);
    await renderGenresList(ctx, genreType.toLocaleLowerCase());
  } catch {
    ctx.reply("sorry i can't found movies");
  }
}

export async function getLinksFromUser(ctx: Ctx) {
  try {
    const movieId = (<any>ctx).user.waitingLink;
    if (!movieId) {
      return;
    }
    console.log(ctx.message.text);
    (<any>ctx).user.waitingLink = null;
    await AppDataSource.manager.save((<any>ctx).user);
    const m = new Movies();
    const movie = await m.getMovieById(movieId);
    if (!movie) throw Error();
    await sendLinkMovieAdmin(ctx, movie);
    (<any>ctx).user.waitingLink = null;
    await AppDataSource.manager.save((<any>ctx).user);
    ctx.reply('Thanks! The link will be reviewed.');
  } catch (err) {
    ctx.reply('something wrong happend');
  }
}
