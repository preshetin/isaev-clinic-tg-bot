import { Telegraf } from 'telegraf';

import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('about', about());
bot.on('message', greeting());

// Handle button presses
bot.action('yes', (ctx) => {
  const originalMessage = ctx.update.callback_query.message as any;
  console.log('11111', originalMessage)
  ctx.editMessageText(`${originalMessage.text}\nYou pressed yes`);
});

bot.action('no', (ctx) => {
  ctx.reply('You pressed No');
});

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
