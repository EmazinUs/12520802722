import { generateShortCode } from "../utils/shortener";
import { isValidCode, isValidUrl } from "../utils/validators";

interface UrlRecord {
  originalUrl: string;
  expiresAt: number; // UNIX timestamp
}

const urlMap: Record<string, UrlRecord> = {};

export const createShortLink = async (
  originalUrl: string,
  validityMinutes?: number,
  customCode?: string
) => {
  if (!isValidUrl(originalUrl)) {
    throw { status: 400, message: "Invalid URL" };
  }

  const code = customCode?.trim() || generateShortCode();
  if (!isValidCode(code)) {
    throw {
      status: 400,
      message: "Custom code must be alphanumeric and 4–10 chars",
    };
  }
  if (urlMap[code]) {
    throw { status: 409, message: "Shortcode already exists" };
  }

  const expiry = Date.now() + (validityMinutes || 30) * 60 * 1000;
  urlMap[code] = { originalUrl, expiresAt: expiry };

  return {
    shortUrl: `http://localhost:3000/api/url/${code}`,
    code,
    expiresAt: new Date(expiry).toISOString(),
  };
};

export const getOriginalUrl = async (code: string) => {
  const record = urlMap[code];
  if (!record) {
    throw { status: 404, message: "Shortcode not found" };
  }

  if (Date.now() > record.expiresAt) {
    delete urlMap[code];
    throw { status: 410, message: "Link has expired" };
  }

  return record.originalUrl;
};
