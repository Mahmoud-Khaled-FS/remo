import { Composer } from 'telegraf';
import { changeLanguage, helpService, startService } from '../service/commands';
import { getRandomMovieFromMessage } from '../service/message';

const commands = new Composer();

commands.start(startService);
commands.help(helpService);
commands.command('rand', getRandomMovieFromMessage);
commands.command('setlang', changeLanguage);

export default commands;
