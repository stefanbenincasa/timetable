"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPool = void 0;
const pg_1 = require("pg");
class CustomPool extends pg_1.Pool {
    constructor(config) {
        super(config);
    }
    queryWithParams(queryText, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.connect();
            try {
                const result = yield client.query(queryText, values);
                client.release();
                return result;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.CustomPool = CustomPool;
