import crypto from 'crypto'
import { Buffer } from 'buffer';

export function hash(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
}

export function b64enc(content: string): string {
    let tmpBuf = Buffer.from(content);
    return tmpBuf.toString('base64');
}
