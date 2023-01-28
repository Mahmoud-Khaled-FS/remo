import { Context } from 'telegraf';
import AppDataSource, { userRepository } from '../service/database';
import User from '../models/user';
import { Update } from 'telegraf/typings/core/types/typegram';

export async function getUserData(ctx: Context<Update>, next: () => Promise<void>) {
  let user = await userRepository.findOneBy({
    id: ctx.from?.id,
  });
  if (!user) {
    user = new User();
    user.id = ctx.from?.id!;
    user.lang = 'en';
    await AppDataSource.manager.save(user);
  }
  (<any>ctx).user = user;
  next();
}
