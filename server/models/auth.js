const Sequelize = require('sequelize');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const jwt = require('jsonwebtoken');

const db = new Sequelize('truevia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = db.define('user', {
  name: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
});

db.sync()

/**
 * async registerUser - registers a user to the database
 *
 * @param  {type} user     username string
 * @param  {type} password password string
 * @return {type}          promise of success obj
 */
module.exports.registerUser = async function(user, password) {
  if (!user || !password) return {success: false, message: 'User and password required'};
  const res = await User.find({where: {name: user}});
  if (res) return {success: false, message: 'User already exists'};

  const hash = await bcrypt.hashAsync(password, null, null);
  const userModel = await User.create({name: user, password: hash});
  return {success: true, message: 'User registered'};
};

/**
 * async verifyUser - check whether a user is verified
 *
 * @param  {type} user     username string
 * @param  {type} password password string
 * @return {type}          promise of success object
 */
module.exports.verifyUser = async function(user, password) {
  const userRes = await User.find({where: {name: user}})
  console.log('RESULT', userRes);
  if (!userRes) return {success: false, message: 'User not found'};
  const passwordMatch = await bcrypt.compareAsync(password, userRes.dataValues.password);
  const response = passwordMatch ? {
    message: 'User verified',
    user: userRes.name,
    token: jwt.sign({
      user: userRes.name
    }, jwtSecret)
  } : {
    message: 'Incorrect password'
  };
  return Object.assign({ success: passwordMatch }, response);
};
