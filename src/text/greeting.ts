import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  // ctx.reply(string, {
  //   reply_parameters: { message_id: messageId },
  // });
  ctx.reply(string, Markup.inlineKeyboard([
    Markup.button.callback('Yes', 'yes'),
    Markup.button.callback('No', 'no')
  ]));


const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;

  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello 222, ${userName}!`);
  }
};

export { greeting };
