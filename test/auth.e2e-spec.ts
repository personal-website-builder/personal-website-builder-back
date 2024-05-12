import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { appe2eInit } from './appe2eInit';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = (await appe2eInit()).app;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/auth/login (POST) login', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'admin@pwb.com',
        password: 'admin',
      })
      .expect(201);
  });
});
