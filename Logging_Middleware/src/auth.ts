import axios from "axios";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

const Url = "https://20.244.56.144/evaluation-service/auth";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let token: string = "";
let expiry: number = 0;

export const getAccessToken = async (): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);

  if (token && now < expiry) {
    return token;
  }

  const res = await axios.post(
    Url,
    {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    {
      httpsAgent,
    }
  );

  token = res.data.access_token;
  expiry = res.data.expires_in;

  return token;
};
