export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const isValidCode = (code: string): boolean => {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
};
