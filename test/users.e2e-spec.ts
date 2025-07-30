import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
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

  it('/users/profile (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('/users/update-profile (PATCH)', async () => {
    const res = await request(app.getHttpServer())
      .patch('/users/update-profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated User');
  });

  afterAll(async () => {
    await app.close();
  });
});
