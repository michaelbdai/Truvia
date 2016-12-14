const auth = require('../../models/auth')

exports.signin = async function(req, res) {
  let results;
  try {
    results = await auth.verifyUser(req.body.name, req.body.password);
  } catch (e) { return res.status(500).json({ message: 'Something weird happened' }); }
  res.json(results);
}

exports.signup = async function(req, res) {
  let results;
  try {
    results = await auth.registerUser(req.body.name, req.body.password);
  } catch (e) { return res.status(500).json({ message: 'Something weird happened' }); }
  res.json(results);
}

exports.guestLogin = async function(req, res) {
  let results;
  try {
    results = await auth.guestLogin(req.body.name, req.body.roomID);
  } catch (e) { return res.status(500).json({ message: 'Something weird happened' }); }
  res.json(results);
}
