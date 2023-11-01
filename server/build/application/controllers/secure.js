"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySession = void 0;
const verifySession = (req, res, next) => {
    console.log(req.session.studentId);
    if (req.session && req.session.studentId) {
        console.log('User is authenticated.');
        next();
    }
    else {
        console.log('User is NOT authenticated.');
        res.status(401).send();
    }
};
exports.verifySession = verifySession;
