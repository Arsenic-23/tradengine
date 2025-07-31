import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { MorganMiddleware } from './morgan.middleware';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
