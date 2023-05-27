'use strict';

const { app } = require('../src/server.js');
const { db, users } = require('../src/auth/models/index.js');
const supertest = require('supertest');
const mockRequest = supertest(app);

let testAdmin;

beforeAll(async () => {
  await db.sync();
  testAdmin = await users.create({
    username: 'testAdmin',
    password: 'pass123',
    role: 'admin',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('Routes', () => {

  it('updates a record', async() => {
    let response = await mockRequest.put('/update/1').send({
      username: 'admin',
      password: 'pass123',
      role: 'admin',
    }).set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toEqual(200);
    expect(response).toEqual('admin');
  });

  it('deletes a record', async() => {
    let response = await mockRequest.delete('/delete/1').set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response).toEqual(1);
    expect(response.status).toEqual(200);
  });
});
