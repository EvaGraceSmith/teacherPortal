'use strict';

const express = require('express');
const router = express.Router();
const {users} = require('../auth/models/index.js');
// const basicAuth = require('../auth/middleware/basic.js');
// const bearerAuth = require('../auth/middleware/bearer.js');
// const permissions = require('../auth/middleware/acl.js');


router.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    res.status(201).json(userRecord);
  } catch (e) {
    next(e.message);
  }
});

// router.post('/signin', basicAuth, (req, res, next) => {
//   res.status(200).json(req.user);
// });

router.get('/users', async (req, res, next) => {
  try {
    const allUsers = await users.findAll({});
    const list = allUsers.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    next(e.message);
  }
});

// router.get('/secret', basicAuth, (req, res, next) => {
//   res.status(200).send('Welcome to the secret area!');
// });


router.get('/', (req, res) => {
  res.status(200).send('Hello World');
},
);


module.exports = router;

