"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    req.session.username = 'john@example.com';
    res.json(req.session);
});
exports.default = router;
