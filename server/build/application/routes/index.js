"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/login', (req, res) => {
    let options = { secure: true, httpOnly: true, maxAge: 900000, sameSite: true };
    res.cookie('session_id', req.session.id, options);
    res.send('Login route');
});
router.get('/signup', (req, res) => {
    res.send('Signup route');
});
exports.default = router;
