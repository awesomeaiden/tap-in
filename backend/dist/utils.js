"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64enc = exports.hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
function hash(content) {
    return crypto_1.default.createHash('sha256').update(content).digest('hex');
}
exports.hash = hash;
function b64enc(content) {
    return Buffer.from(content).toString('base64');
}
exports.b64enc = b64enc;
//# sourceMappingURL=utils.js.map