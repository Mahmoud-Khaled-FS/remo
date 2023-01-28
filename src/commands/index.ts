import { Composer } from 'telegraf';
import commands from './commands';
import hears from './hears';
import actions from './actions';
import { getUserData } from './middleware';

const botService = new Composer();

botService.use(getUserData);

botService.use(commands);

botService.use(hears);
botService.use(actions);

export default botService;
