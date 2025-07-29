import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './config.service';
import { databaseConfig } from './database.config';
import { jwtConfig } from './jwt.config';
import { marketConfig } from './market.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig, jwtConfig, marketConfig],
    }),
  ],
})
export class ConfigModule {}