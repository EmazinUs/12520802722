import axios from "axios";
import https from "https";
import { getAccessToken } from "./auth";

const Url = "https://20.244.56.144/evaluation-service/log";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const Log = async (
  stack: "frontend" | "backend",
  level: "info" | "error" | "warn" | "debug",
  pkg: string,
  message: string
): Promise<void> => {
  try {
    const token = await getAccessToken();

    const payload = {
      stack,
      level,
      package: pkg,
      message,
      timestamp: new Date().toISOString(),
    };

    await axios.post(Url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    });
  } catch (err: any) {}
};
