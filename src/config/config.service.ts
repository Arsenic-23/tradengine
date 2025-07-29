import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get(key: string): string {
    return this.configService.get<string>(key);
  }

  getNumber(key: string): number {
    return Number(this.get(key));
  }

  getBoolean(key: string): boolean {
    return this.get(key) === 'true';
  }

  getJwtSecret(): string {
    return this.get('jwt.secret');
  }

  getDatabaseUri(): string {
    return this.get('database.uri');
  }

  getMarketApiKey(): string {
    return this.get('market.apiKey');
  }

  getMarketBaseUrl(): string {
    return this.get('market.baseUrl');
  }
}