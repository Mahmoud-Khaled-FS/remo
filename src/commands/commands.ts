import { Composer } from 'telegraf';
import { changeAdult, changeLanguage, getGenresListService, helpService, startService } from '../service/commands';
import { getRandomMovieFromMessage } from '../service/message';

const commands = new Composer();

commands.start(startService);
commands.help(helpService);
commands.command('rand', getRandomMovieFromMessage);
commands.command('genres', getGenresListService);
commands.command('setlang', changeLanguage);
commands.command('adult', changeAdult);

export default commands;
