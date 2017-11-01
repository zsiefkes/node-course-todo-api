const {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  // req.header returns the value for the key that you want to fetch.

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
