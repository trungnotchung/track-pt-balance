import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import {
  appConfig,
  contractsConfig,
  databaseConfig,
  ethereumConfig,
  jwtConfig,
  discordConfig,
} from './config';
import { DiscordModule } from './discord/discord.module';
import { SyncModule } from './sync/sync.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        ethereumConfig,
        contractsConfig,
        jwtConfig,
        discordConfig,
      ],
    }),
    JwtModule.registerAsync({
      global: true,
      ...jwtConfig.asProvider(),
    }),
    MongooseModule.forRoot(databaseConfig().url, {
      dbName: databaseConfig().databaseName,
    }),
    UsersModule,
    SyncModule,
    AuthModule,
    DiscordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
