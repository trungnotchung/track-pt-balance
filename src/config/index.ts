import { config } from 'dotenv';

config();

export { default as appConfig } from './app.config';
export { default as databaseConfig } from './database.config';
export { default as ethereumConfig } from './ethereum.config';
export { default as contractsConfig } from './contracts.config';
export { default as jwtConfig } from './jwt.config';
export { default as discordConfig } from './discord.config';
