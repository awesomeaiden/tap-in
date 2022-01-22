"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64enc = exports.hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const buffer_1 = require("buffer");
function hash(content) {
    return crypto_1.default.createHash('sha256').update(content).digest('hex');
}
exports.hash = hash;
function b64enc(content) {
    let tmpBuf = buffer_1.Buffer.from(content);
    return tmpBuf.toString('base64');
}
exports.b64enc = b64enc;
//# sourceMappingURL=utils.js.map