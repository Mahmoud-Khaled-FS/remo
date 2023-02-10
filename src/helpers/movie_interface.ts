import { Context } from 'telegraf';
import { getFormatMovieArgs, getFormatListMoviesArgs, formatAnswerToSend, formatMovieLink } from '../lib/format';
import { MovieData } from '../types/movies';
import { chunk } from 'lodash';
import { messageAnswer } from '../constants/answerMessages';
import { genreList } from '../constants/genre';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

export function createButtonsForListMovies(movies: MovieData[]) {
  const buttons = movies.map((m, i) => ({ text: String(i + 1), callback_data: 'id:' + m.id }));
  return chunk(buttons, 5);
}

export async function renderMovieInChat(ctx: Context, movie: MovieData) {
  const message = await ctx.reply('Loading...');
  await ctx.sendChatAction('typing');
  const year = new Date(movie.release_date).getFullYear();
  const isGroup = ctx.chat?.type === 'group' || ctx.chat?.type === 'supergroup';
  if (movie.poster_path) {
    await ctx.sendPhoto(
      { url: formatMovieLink(movie.poster_path), filename: movie.title },
      {
        reply_to_message_id: isGroup ? ctx.message?.message_id : undefined,
      },
    );
  }
  await ctx.deleteMessage(message.message_id);
  const movieArrgs = getFormatMovieArgs(movie, (<any>ctx).user.lang);
  const answer = formatAnswerToSend((<any>ctx).user, messageAnswer.movieMessage, movieArrgs);
  await ctx.replyWithHTML(answer, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Similar movies', callback_data: 'rec:' + movie.id }],
        [
          { text: 'Trailer', callback_data: `trailer:${movie.original_title}+${year}` },
          { text: 'Top Cast', callback_data: `top_cast:${movie.id}` },
        ],
        [{ text: 'Link', callback_data: 'm_link:' + movie.id }],
      ],
    },
  });
}

export async function renderListMoviesInChat(ctx: Context, moviesList: MovieData[]) {
  const moviesListArrgs = getFormatListMoviesArgs(moviesList);
  const answer = formatAnswerToSend((<any>ctx).user, messageAnswer.listMoviesMessage, moviesListArrgs);
  ctx.replyWithHTML(answer, {
    reply_markup: {
      inline_keyboard: [...createButtonsForListMovies(moviesList), [{ text: '❌', callback_data: 'cancel' }]],
    },
  });
}

export async function renderGenresList(ctx: Context, type?: string, prev?: string) {
  const lang = (<any>ctx).user.lang;
  let cd = 'cancel';
  if (prev && prev.startsWith('g_and')) {
    cd = prev.replace('g_and', 'id_g');
  } else if (prev && prev.startsWith('g_or')) {
    cd = prev.replace('g_or', 'id_g');
  }
  const genreListButton = genreList.map((g): InlineKeyboardButton => {
    switch (type) {
      case 'and':
        return {
          text: lang === 'ar' ? g.ar_name : g.name,
          callback_data: prev === '' || !prev ? 'g_and:' + g.id : prev + ',' + g.id,
        };
      case 'or':
        return {
          text: lang === 'ar' ? g.ar_name : g.name,
          callback_data: prev === '' || !prev ? 'g_or:' + g.id : prev + '|' + g.id,
        };
      default:
        return {
          text: lang === 'ar' ? g.ar_name : g.name,
          callback_data: 'id_g:' + g.id,
        };
    }
  });
  await ctx.reply('Choose genre', {
    reply_markup: {
      inline_keyboard: !type
        ? chunk(genreListButton, 2)
        : [
            ...chunk(genreListButton, 2),
            [
              { text: '❌', callback_data: 'cancel_delete' },
              { text: prev ? '✅' : '', callback_data: cd },
            ],
          ],
    },
  });
}
