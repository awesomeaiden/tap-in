import crypto from 'crypto'

export function hash(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
}

export function b64enc(content: string): string {
    return Buffer.from(content).toString('base64');
}
