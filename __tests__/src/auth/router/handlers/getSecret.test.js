'use strict';
const request = require('supertest');
const app = require('../../../../../src/router/index.js');


describe('GET /secret', () => {
  it('should return 200 OK and a welcome message', async () => {
    const response = await request(app)
      .get('/secret')
      .auth('username', 'password');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the secret area!');
  });

  it('should return 401 Unauthorized if no credentials are provided', async () => {
    const response = await request(app)
      .get('/secret');

    expect(response.status).toBe(401);
  });
});

