'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {
    if (!req.headers.authorization) { return _authError(); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    console.log( '*************', validUser);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error(e.message || e);
    res.status(403).send(e.message);
    // _authError(e);
  }
  function _authError(e) {
    res.status(403).send('Invalid Login');

  }
};
