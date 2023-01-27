import { Composer } from 'telegraf';
import { startService } from '../service/commands';

const commands = new Composer();

commands.start(startService);

export default commands;
