import { Context } from 'telegraf';
import { formatMovie, formatMovieLink, formatMoviesListMessageHeader } from '../lib/format';
import { MovieData, MovieListItem } from '../types/movies';

export function createButtonsForListMovies(movies: MovieListItem[]) {
  const buttons = [];
  buttons.push(movies.slice(0, 5).map((m, i) => ({ text: String(i + 1), callback_data: 'id:' + m.id })));
  if (movies.length > 5) {
    buttons.push(movies.slice(5).map((m, i) => ({ text: String(i + 6), callback_data: 'id:' + m.id })));
  }
  return buttons;
}

export async function renderMovieInChat(ctx: Context, movie: MovieData) {
  const message = await ctx.reply('Loading...');
  await ctx.sendChatAction('typing');
  if (movie.poster_path) {
    await ctx.sendPhoto({ url: formatMovieLink(movie.poster_path), filename: movie.title });
  }
  await ctx.deleteMessage(message.message_id);
  await ctx.replyWithHTML(formatMovie(movie), {
    reply_markup: {
      inline_keyboard: [[{ text: 'Similar movies', callback_data: 'rec:' + movie.id }]],
    },
  });
}

export async function renderListMoviesInChat(ctx: Context, moviesList: MovieListItem[]) {
  ctx.replyWithHTML(formatMoviesListMessageHeader(moviesList), {
    reply_markup: {
      inline_keyboard: [...createButtonsForListMovies(moviesList), [{ text: '❌', callback_data: 'cancel' }]],
    },
  });
}
