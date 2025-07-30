import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('TradesController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'TestPass123',
      });

    token = login.body.accessToken;
  });

  it('/trades (POST) - open trade', async () => {
    const res = await request(app.getHttpServer())
      .post('/trades')
      .set('Authorization', `Bearer ${token}`)
      .send({
        symbol: 'AAPL',
        type: 'BUY',
        volume: 1,
        entryPrice: 175.0,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('symbol', 'AAPL');
  });

  it('/trades/history (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/trades/history')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
