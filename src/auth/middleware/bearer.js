'use strict';

const { User } = require('../models/index.js');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await User.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;

    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
