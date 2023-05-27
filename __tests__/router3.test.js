// Import the necessary modules and functions
const request = require('supertest');
const { app } = require('../src/server.js');
const { db } = require('../src/auth/models/index.js');
const userModel = require('../src/auth/models/users.js');
const { DataTypes } = require('sequelize');


// Create a test user for authentication
const testUser = {
  username: 'testuser',
  password: 'testpassword',
  role: 'student',
};

// Helper function to generate a JWT token for authentication
const generateToken = () => {
  return userModel(db, DataTypes).build(testUser).token;
};

// Before running the tests, create the test user in the database
beforeAll(async () => {
  await db.sync();
  userModel( db, DataTypes).create(testUser);
});

describe('CRUD Routes', () => {
  // Test the POST /signup route
  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ username: 'newuser', password: 'newpassword', role: 'student' });
      expect(response.status).toBe(201);
      // Add additional assertions as per your requirements
    });
  });

  // Test the POST /signin route
  describe('POST /signin', () => {
    it('should authenticate the user', async () => {
      const response = await request(app)
        .post('/signin')
        .auth(testUser.username, testUser.password);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the GET /users route
  describe('GET /users', () => {
    it('should get a list of users', async () => {
      const token = generateToken();
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the GET /secret route
  describe('GET /secret', () => {
    it('should access the secret area', async () => {
      const response = await request(app)
        .get('/secret')
        .auth(testUser.username, testUser.password);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the PUT /update/:id route
  describe('PUT /update/:id', () => {
    it('should update a user', async () => {
      const token = generateToken();
      const response = await request(app)
        .put('/update/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ username: 'newusername' });
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the DELETE /delete/:id route
  describe('DELETE /delete/:id', () => {
    it('should delete a user', async () => {
      const token = generateToken();
      const response = await request(app)
        .delete('/delete/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });
});

