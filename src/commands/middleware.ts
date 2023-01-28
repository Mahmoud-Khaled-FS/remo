import { Context } from 'telegraf';
import { userRepository } from '../service/database';

export async function getUserData(ctx: Context, next: () => Promise<void>) {
  const user = await userRepository.findOneBy({
    id: ctx.from?.id,
  });
  (<any>ctx).user = user;
  next();
}
