const verifySession = (req, res, next) => {
  if (req.session && req.session.id) {
		console.log(req.session.id)
    next();
  } else {
		res.status(401).send()
  }
};

module.exports = { verifySession }

