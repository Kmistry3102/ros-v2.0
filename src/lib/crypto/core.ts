import crypto from "crypto";

export const generateKey = (secret: string) =>
  crypto.createHash("sha256").update(secret).digest();

export const encryptText = (text: string, key: Buffer): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};
