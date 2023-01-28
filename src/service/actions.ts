import { Context, NarrowedContext } from 'telegraf';
import { CallbackQuery, Update } from 'telegraf/typings/core/types/typegram';
import { splitMessageHears } from '../helpers/splitMessageHears';
import Movies from '../lib/movies';
import { renderListMoviesInChat, renderMovieInChat } from '../helpers/movie_interface';
import AppDataSource from './database';
import User from '../models/user';

type Ctx = NarrowedContext<
  Context<Update> & {
    match: RegExpExecArray;
  },
  Update.CallbackQueryUpdate<CallbackQuery>
>;

export async function cancelMessage(ctx: Ctx) {
  await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
}
export async function cancelWithRemoveMessage(ctx: Ctx) {
  await ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
}

export async function getMovieByIdFromMessage(ctx: Ctx) {
  try {
    const id = splitMessageHears(ctx.match[0]);
    const m = new Movies((<any>ctx).user?.lang);
    const movie = await m.getMovieById(+id);
    if (!movie) throw new Error();
    await ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
    return renderMovieInChat(ctx, movie);
  } catch {
    ctx.reply('can not find this movie :(');
  }
}
export async function getRecommendationsForMovie(ctx: Ctx) {
  try {
    await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    const id = splitMessageHears(ctx.match[0]);
    const m = new Movies((<any>ctx).user?.lang);
    const movies = await m.getMovieRecommendations(+id);
    if (!movies || movies.length === 0) throw new Error();
    return renderListMoviesInChat(ctx, movies);
  } catch {
    ctx.reply('can not find movies :(');
  }
}

export async function changeLanguageAction(ctx: Ctx) {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
    const lang = splitMessageHears(ctx.match[0]);
    if ((<any>ctx).user.lang !== lang) {
      await AppDataSource.createQueryBuilder()
        .update(User)
        .set({
          lang: lang,
        })
        .where('id = :id', { id: (<any>ctx).user.id })
        .execute();
    }
    await ctx.reply(`Language set to ${lang === 'ar' ? 'العربية' : 'English'}`);
  } catch {
    ctx.reply('something wrong happend');
  }
}
