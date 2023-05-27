// Import the necessary modules and functions
const request = require('supertest');
const { app } = require('../src/server.js');
const { db } = require('../src/auth/models/index.js');
const userModel = require('../src/auth/models/users.js');
const { DataTypes } = require('sequelize');

let ourTestAdmin; // trying to initialize the test created user for json token testing with bearer

// Create a test user for authentication
const testAdmin = {
  username: 'testuser',
  password: 'testpassword',
  role: 'admin',
};


// Before running the tests, create the test user in the database
beforeAll(async () => {
  await db.sync();
  //create an admin user generates a token that is stored in our test variable
  ourTestAdmin= await userModel( db, DataTypes).create(testAdmin);
});

afterAll(async () => {
  await db.drop();
},
);
// Helper function to generate a JWT token for authentication
// const generateToken = () => {
//     return userModel(db, DataTypes).build(testAdmin).token;
//   };

describe('CRUD Routes', () => {
  // Test the POST /signup route
  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ username: 'newuser', password: 'newpassword', role: 'student' })
        .set('Authorization', `Bearer ${ourTestAdmin.token}`);
      expect(response.status).toBe(201);
      // Add additional assertions as per your requirements
    });
  });

  describe('404', () => {
    it('should not create a new user as GET route is incorrect', async () => {
      const response = await request(app)
        .get('/signup')
        .send({ username: 'newuser', password: 'newpassword', role: 'student' })
        .set('Authorization', `Bearer ${ourTestAdmin.token}`);
      expect(response.status).toBe(404);
      // Add additional assertions as per your requirements
    });
  });

  // Test the POST /signin route
  describe('POST /signin', () => {
    it('should authenticate the user', async () => {
      const response = await request(app)
        .post('/signin')
        .auth(testAdmin.username, testAdmin.password);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the GET /users route
  describe('GET /users', () => {
    it('should get a list of users', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${ourTestAdmin.token}`);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the GET /secret route
  describe('GET /secret', () => {
    it('should access the secret area', async () => {
      const response = await request(app)
        .get('/secret')
        .auth(testAdmin.username, testAdmin.password);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the PUT /update/:id route
  describe('PUT /update/:id', () => {
    it('should update a user', async () => {
      const response = await request(app)
        .put('/update/2')
        .set('Authorization', `Bearer ${ourTestAdmin.token}`)
        .send({ username: 'newusername' });
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });

  // Test the DELETE /delete/:id route
  describe('DELETE /delete/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app)
        .delete('/delete/2')
        .set('Authorization', `Bearer ${ourTestAdmin.token}`);
      expect(response.status).toBe(200);
      // Add additional assertions as per your requirements
    });
  });
});

