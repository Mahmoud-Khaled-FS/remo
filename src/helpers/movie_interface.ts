import { Context } from 'telegraf';
import { getFormatMovieArgs, formatMovieLink, getFormatListMoviesArgs, formatAnswerToSend } from '../lib/format';
import { MovieData } from '../types/movies';
import { chunk } from 'lodash';
import { messageAnswer } from '../constants/answerMessages';

export function createButtonsForListMovies(movies: MovieData[]) {
  const buttons = movies.map((m, i) => ({ text: String(i + 1), callback_data: 'id:' + m.id }));
  // buttons.push(movies.slice(0, 5).));
  // if (movies.length > 5) {
  //   buttons.push(movies.slice(5).map((m, i) => ({ text: String(i + 6), callback_data: 'id:' + m.id })));
  // }
  return chunk(buttons, 5);
}

export async function renderMovieInChat(ctx: Context, movie: MovieData) {
  const message = await ctx.reply('Loading...');
  await ctx.sendChatAction('typing');
  const year = new Date(movie.release_date).getFullYear();
  if (movie.poster_path) {
    await ctx.sendPhoto({ url: formatMovieLink(movie.poster_path), filename: movie.title });
  }
  await ctx.deleteMessage(message.message_id);
  const movieArrgs = getFormatMovieArgs(movie, (<any>ctx).user.lang);
  const answer = formatAnswerToSend((<any>ctx).user, messageAnswer.movieMessage, movieArrgs);
  await ctx.replyWithHTML(answer, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Similar movies', callback_data: 'rec:' + movie.id }],
        [{ text: 'Trailer', callback_data: `trailer:${movie.original_title}+${year}` }],
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
