"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    res.send();
});
router.get('/', (req, res) => {
    res.send('Student route');
});
router.put('/', (req, res) => {
    res.send();
});
router.delete('/', (req, res) => {
    res.send();
});
exports.default = router;
