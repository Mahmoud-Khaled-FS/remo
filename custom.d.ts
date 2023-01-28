// import { Telegraf } from 'telegraf';
import User from './src/models/user';

export {};

declare global {
  namespace Telegraf {
    export interface Context<Update> {
      user: User | null;
    }
  }
}
