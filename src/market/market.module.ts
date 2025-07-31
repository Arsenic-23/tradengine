import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  controllers: [MarketController],
  providers: [MarketService, WebsocketGateway],
  exports: [MarketService],
})
export class MarketModule {}
