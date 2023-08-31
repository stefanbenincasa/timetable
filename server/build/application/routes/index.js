"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    let { username, password } = req.body, authenticated = false;
    res.send();
});
exports.default = router;
