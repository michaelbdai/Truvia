var Sequelize = require('sequelize');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var db = new Sequelize('truevia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

var User = db.define('user', {
  name: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
});
db.sync()

/*
* inputs: string, string
* outputs: promise that resolves to a user object
* error on: user or password fields invalid, user exists 
*
* creates a new user and hashes their password
* 
* do not switch to findOrCreate, it will not play
* nice with bcrypt
*/

module.exports.registerUser = function(user, password) { 
  return new Promise(function(resolve, reject) {
    if (!user || !password) {
      reject('must pass user / password args');
    } else {
      User.find({where: {name: user}}).then(function(res) {
        if (res) {
          reject('user already exists');
        } else {
          bcrypt.hash(password, salt, null, function(err, hash) {
            if (err) {
              console.log('erroring');
              reject(err);
            } else {
              resolve(hash);
            }
          });
        }
      });
    }
  }).then(function(hash) {
    return User.create({where: {name: user, password: hash}});
  });
};

/*
* input: string, string
* output: boolean
* error on: user not in db, db error
*
* checks if a user is registered
*
*/ 
module.exports.verifyUser = function(user, password) {
  return new Promise(function(resolve, reject) {
    User.find({where: {name: user}}).then(function(userRes) {
      if (!userRes) {
        resolve(false);
      } else {
        bcrypt.compare(password, userRes.dataValues.password, function(err, comparison) {
          if (err) {
            reject(err);
          } else {
            resolve(comparison);
          }
        });
      }
    });
  });
};