import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import zlib from "zlib";

// Helper: AES-GCM encrypt
function aesEncrypt(plainText: string, key: Buffer): { iv: Buffer; cipherText: Buffer } {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const cipherText = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  // GCM tag is needed for decryption
  const tag = cipher.getAuthTag();
  return { iv: Buffer.concat([iv, tag]), cipherText };
}

// Helper: AES-GCM decrypt
function aesDecrypt(cipherText: Buffer, key: Buffer, ivAndTag: Buffer): string {
  const iv = ivAndTag.slice(0, 12);
  const tag = ivAndTag.slice(12);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
  return decrypted.toString("utf8");
}

// Helper: Derive key from password
function deriveKey(password: string): Buffer {
  // Use PBKDF2 for key derivation
  return crypto.pbkdf2Sync(password, Buffer.alloc(16), 100000, 32, "sha256");
}

function brotliCompress(buf: Buffer): Buffer {
  return zlib.brotliCompressSync(buf);
}
function brotliDecompress(buf: Buffer): Buffer {
  return zlib.brotliDecompressSync(buf);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Encrypt & compress
    try {
      const { input, password } = req.body;
      const obj = typeof input === "string" ? JSON.parse(input) : input;
      const json = JSON.stringify(obj);
      const key = deriveKey(password);
      const { iv, cipherText } = aesEncrypt(json, key);
      const combined = Buffer.concat([iv, cipherText]);
      const compressed = brotliCompress(combined);
      const base64 = compressed.toString("base64");
      res.status(200).json({ base64 });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  } else if (req.method === "PUT") {
    // Decompress & decrypt
    try {
      const { base64, password } = req.body;
      const compressed = Buffer.from(base64, "base64");
      const combined = brotliDecompress(compressed);
      const ivAndTag = combined.slice(0, 28); // 12 bytes IV + 16 bytes tag
      const cipherText = combined.slice(28);
      const key = deriveKey(password);
      const json = aesDecrypt(cipherText, key, ivAndTag);
      res.status(200).json({ json: JSON.parse(json) });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  } else {
    res.status(405).end();
  }
}
