var Sequelize = require('sequelize');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var db = new Sequelize('truevia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

var User = db.define('user', {
  name: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
});

db.sync()

/**
 * async registerUser - registers a user to the database
 *
 * @param  {type} user     username string
 * @param  {type} password password string
 * @return {type}          promise of created user model
 */
module.exports.registerUser = async function(user, password) {
  if (!user || !password) throw 'must pass user / password args';
  const res = await User.find({where: {name: user}});
  if (res) throw 'user already exists';

  const hash = await bcrypt.hashAsync(password, null, null);
  const userModel = await User.create({name: user, password: hash});
  return userModel;
};

/**
 * async verifyUser - check whether a user is verified
 *
 * @param  {type} user     username string
 * @param  {type} password password string
 * @return {type}          Boolean Promise
 */
module.exports.verifyUser = async function(user, password) {
  const userRes = await User.find({where: {name: user}})
  console.log('RESULT', userRes);
  if (!userRes) return false;
  console.log('here')
  const comparison = await bcrypt.compareAsync(password, userRes.dataValues.password)
  return comparison;
};
