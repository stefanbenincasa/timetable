const verifySession = (req, res, next) => {
  if(req.session && req.session.studentId) {
		console.log('User is authenticated.')
    next()
  }else {
		console.log('User is NOT authenticated.')
		res.status(401).send()
  }
}

module.exports = { verifySession }

