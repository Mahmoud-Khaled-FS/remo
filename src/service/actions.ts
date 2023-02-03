import { Context, NarrowedContext } from 'telegraf';
import { CallbackQuery, Update } from 'telegraf/typings/core/types/typegram';
import { splitMessageHears } from '../helpers/splitMessageHears';
import Movies from '../lib/movies';
import { renderGenresList, renderListMoviesInChat, renderMovieInChat } from '../helpers/movie_interface';
import AppDataSource from './database';
import User from '../models/user';
import { genreList } from '../constants/genre';

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
    const m = new Movies((<any>ctx).user);
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
    const m = new Movies((<any>ctx).user);
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
export async function changeAdultAction(ctx: Ctx) {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
    const adult = splitMessageHears(ctx.match[0]) === 'true';
    if ((<any>ctx).user.adult !== adult) {
      await AppDataSource.createQueryBuilder()
        .update(User)
        .set({
          adult: adult,
        })
        .where('id = :id', { id: (<any>ctx).user.id })
        .execute();
    }
    await ctx.reply(`${adult ? 'Adult filter work' : 'Adult filter stoped'}`);
  } catch {
    ctx.reply('something wrong happend');
  }
}

export async function getMovieByGenreFromMessage(ctx: Ctx) {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
    const id = splitMessageHears(ctx.match[0]);
    const m = new Movies((<any>ctx).user);
    const movie = await m.getRandomMovieWithGenre(id);
    if (!movie) throw new Error();
    await renderMovieInChat(ctx, movie);
  } catch {
    ctx.reply('something wrong happend');
  }
}
export async function genreAndOrFromMessage(ctx: Ctx) {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
    const type = ctx.match.groups?.type.toLowerCase();
    const idsGenreList = splitMessageHears(ctx.match[0]).split(type === 'and' ? ',' : '|');
    const idsGenresName = idsGenreList
      .map((id) => {
        const genre = genreList.find((g) => g.id === +id);
        if ((<any>ctx).user.lang === 'ar') {
          return genre?.ar_name;
        }
        return genre?.name;
      })
      .join(type === 'and' ? ' and ' : ' or ');
    ctx.reply('Selected genres: ' + idsGenresName);
    await renderGenresList(ctx, type, ctx.match[0]);
  } catch {
    ctx.reply('something wrong happend');
  }
}

export async function getTrailerFromMessage(ctx: Ctx) {
  try {
    const trailerSearchParam = splitMessageHears(ctx.match[0]);
    const m = new Movies();
    const trailerUrl = await m.getTrailer(trailerSearchParam);
    if (!trailerUrl) throw new Error();
    await ctx.reply(trailerUrl);
    await ctx.answerCbQuery();
  } catch {
    ctx.reply('cannot found trailer for this movie');
  }
}

export async function getCastFromMessage(ctx: Ctx) {
  try {
    const movieId = splitMessageHears(ctx.match[0]);
    const m = new Movies();
    const costNames = await m.getCast(movieId);
    if (!costNames || costNames.length === 0) throw new Error();
    const costListText = costNames.map((c, i) => `${i + 1}. ${c}\n`).join('');
    await ctx.reply(costListText);
    await ctx.answerCbQuery();
    return;
  } catch {
    ctx.reply('cannot found cost for this movie');
  }
}
