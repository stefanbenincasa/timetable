"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySession = void 0;
const verifySession = (req, res, next) => {
    if (req.session && req.session.studentId) {
        next();
    }
    else {
        res.status(401).send();
    }
};
exports.verifySession = verifySession;
