var auth = require('../../models/auth')

exports.signin = async function(req, res) {
  const results = await auth.verifyUser(req.body.name, req.body.password);
  res.json(results);
}

exports.signup = async function(req, res) {
  const results = await auth.registerUser(req.body.name, req.body.password);
  res.json(results);
}
