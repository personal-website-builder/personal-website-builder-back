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

  it('/api (GET) isAlive', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('I am alive!');
  });
});
