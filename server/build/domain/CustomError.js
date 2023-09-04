"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(kind = 500, message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.kind = kind;
    }
}
exports.CustomError = CustomError;
