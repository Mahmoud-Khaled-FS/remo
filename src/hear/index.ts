import { Composer } from 'telegraf';
import { getMovieFromMessage } from '../service/message';

const hears = new Composer();

hears.on('text', getMovieFromMessage);

export default hears;
