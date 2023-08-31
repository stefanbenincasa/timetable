"use strict";
const verifySession = (req, res, next) => {
    if (req.session && req.session.sessionID) {
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }
};
module.exports = { verifySession };
