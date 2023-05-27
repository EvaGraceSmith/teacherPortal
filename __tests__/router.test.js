'use strict';

const { app } = require('../src/server.js');
const { db, users } = require('../src/auth/models/index.js');
const supertest = require('supertest');
const mockRequest = supertest(app);

beforeAll(async () => {
  await db.sync();
},
);

afterAll(async () => {
  await db.drop();
},
);

describe('index router', () => {
  it('errors out if route does not exist', async () => {
    let response = await mockRequest.get('/badroute');
    expect(response.status).toEqual(404);
  },
  );

  // const request = require('supertest');
  // const app = require('../src/server.js');
  // const { users } = require('.../src/auth/models/index.js');

  describe('GET /secret', () => {
    it('should return 200 OK and a welcome message', async () => {
      const response = await mockRequest
        .get('/secret')
        .auth('username', 'password');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Welcome to the secret area!');
    });

    it('should return 401 Unauthorized if no credentials are provided', async () => {
      const response = await mockRequest
        .get('/secret');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /update/:id', () => {
    it('should update a user record and return 200 OK', async () => {
      const user = await users.create({ username: 'testuser', password: 'testpassword', role: 'admin' });
      const response = await mockRequest
        .put(`/update/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({ password: 'newpassword' });

      expect(response.status).toBe(200);
      expect(response.body[0]).toBe(1);

      const updatedUser = await users.findByPk(user.id);
      expect(updatedUser.password).toBe('newpassword');
    });

    it('should return 401 Unauthorized if no token is provided', async () => {
      const user = await users.create({ username: 'testuser', password: 'testpassword', role: 'admin' });
      const response = await mockRequest
        .put(`/update/${user.id}`)
        .send({ password: 'newpassword' });

      expect(response.status).toBe(401);
    });

    it('should return 403 Forbidden if user does not have update permission', async () => {
      const user = await users.create({ username: 'testuser', password: 'testpassword', role: 'admin' });
      const response = await mockRequest
        .put(`/update/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({ password: 'newpassword' });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /delete/:id', () => {
    it('should delete a user record and return 200 OK', async () => {
      const user = await users.create({ username: 'testuser', password: 'testpassword', role: 'admin' });
      const response = await mockRequest
        .delete(`/delete/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
      expect(response.body).toBe(1);

      const deletedUser = await users.findByPk(user.id);
      expect(deletedUser).toBeNull();
    });

    it('should return 401 Unauthorized if no token is provided', async () => {
      const user = await users.create({ username: 'testuser', password: 'testpassword', role: 'admin' });
      const response = await mockRequest
        .delete(`/delete/${user.id}`);

      expect(response.status).toBe(401);
    });

    it('should return 403 Forbidden if user does not have delete permission', async () => {
      const user = await users.create({ username: 'testuser', password: 'testpassword', role: 'admin' });
      const response = await mockRequest
        .delete(`/delete/${user.id}`)
        .set('Authorization', `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(403);
    });
  });
});
