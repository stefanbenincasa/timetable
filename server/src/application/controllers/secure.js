const verifySession = (req, res, next) => {
  if(req.session && req.session.studentId) {
		console.log('User is authenticated.')
    next();
  }else {
		res.status(401).send()
  }
};

module.exports = { verifySession }

