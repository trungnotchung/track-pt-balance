import { registerAs } from '@nestjs/config';

export default registerAs('discord', () => ({
  botToken: process.env.DISCORD_BOT_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID,
}));
