import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MarketService } from './market.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly marketService: MarketService) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribeSymbols')
  handleSymbolSubscription(client: Socket, symbols: string[]) {
    console.log(`Client ${client.id} subscribed to:`, symbols);
    symbols.forEach((symbol) => {
      setInterval(() => {
        const randomChange = (Math.random() - 0.5) * 2; // simulate price movement
        const currentPrice = this.marketService.getPrice(symbol);
        if (currentPrice !== null) {
          const newPrice = +(currentPrice + randomChange).toFixed(2);
          this.marketService.updatePrice(symbol, newPrice);
          this.server.emit('priceUpdate', { symbol, price: newPrice });
        }
      }, 2000);
    });
  }
}
