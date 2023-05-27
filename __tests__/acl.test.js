'use strict';

const { app } = require('../src/server.js');
const { db, users } = require('../src/auth/models/index.js');
const supertest = require('supertest');
const mockRequest = supertest(app);

let testStudent;
let testTeacher;
let testAdmin;

beforeAll(async () => {
  await db.sync();

  testStudent = await users.create({
    username: 'Student',
    password: 'pass123',
    role: 'student',
  });
  testTeacher = await users.create({
    username: 'Teacher',
    password: 'pass123',
    role: 'teacher',
  });
  testAdmin = await users.create({
    username: 'testAdmin',
    password: 'pass123',
    role: 'admin',
  });
});

afterAll(async () => {
  await db.drop();
},
);



describe('ACL Integration', () => {
  it('does not allow a student delete access', async () => {
    let response = await mockRequest.get('/users').set('Authorization', `Bearer ${testStudent.token}`);
    let error = JSON.parse(response.text);

    expect(response.status).toEqual(500);
    expect(error.message).toEqual('Access Denied');

  });

  it('does not allow a teacher delete access', async () => {
    let response = await mockRequest.get('/users').set('Authorization', `Bearer ${testTeacher.token}`);

    let result = JSON.parse(response.text);

    expect(response.status).toEqual(500);
    expect(result.message).toEqual('Access Denied');

  });

  it('does allow an admin delete access', async () => {
    let response = await mockRequest.get('/users').set('Authorization', `Bearer ${testAdmin.token}`);

    let result = JSON.parse(response.text);

    expect(response.status).toEqual(200);
    expect(result).toEqual(['Student', 'Teacher', 'testAdmin']);

  });
},
);



