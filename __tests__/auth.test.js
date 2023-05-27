'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { db } = require('../src/auth/models/index.js');
const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Auth router', () => {
  let token;
  it('creates a user', async () => {
    let response = await request.post('/signup').send({
      username: 'Tester',
      password: 'pass123',
      role: 'admin',
    });

    expect(response.status).toEqual(201);
    expect(JSON.parse(response.text).username).toEqual('Tester');
  });
  it('allows existing user to signin', async () => {

    let response = await request.post('/signin').auth('Tester', 'pass123');
    // used for additional auth route test /secret
    // token = JSON.parse(response.text).token;
    expect(response.status).toEqual(200);
    expect(JSON.parse(response.text).username).toEqual('Tester');

    // cannot predict exact - it is hashed.
    expect(JSON.parse(response.text).password).toBeTruthy();

    //token appears different each time, cannot predict exact characters.
    expect(JSON.parse(response.text).token).toBeTruthy();

  });
  it('fails with bad signin credentials', async () => {

    let response = await request.post('/signin').auth('Tester', 'badPassword');

    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Invalid Login line 21');
  });

});
