"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secure_1 = require("../controllers/secure");
const router = (0, express_1.Router)();
// Remember to hash passwords
router.post('/signup', secure_1.verifySession, (req, res) => {
    let { email, password } = req.body;
    // res.json(queryRes.rows) 
});
router.get('/profile', (req, res) => {
    res.send('Student route');
});
router.put('/update_account', (req, res) => {
    res.send();
});
router.delete('/delete_account', (req, res) => {
    res.send();
});
exports.default = router;
