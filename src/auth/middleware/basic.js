'use strict';
const { User } = require('../models/index.js');
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  const authHeader = req.headers.authorization;
  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
  const [username, password] = decodedCredentials.split(':');
  try {
    req.user = await User.authenticateBasic(username, password);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};

// 'use strict';

// const base64 = require('base-64');
// const { User } = require('../models/index.js');

// module.exports = async (req, res, next) => {

//   if (!req.headers.authorization) { return _authError(); }

//   let basic = req.headers.authorization;
//   let [username, pass] = base64.decode(basic).split(':');

//   try {
//     req.user = await User.authenticateBasic(username, pass);
//     next();
//   } catch (e) {
//     console.error(e);
//     res.status(403).send('Invalid Login');
//   }
// };


