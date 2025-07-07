import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { Log } from "../../Logging_Middleware/src/logger";

import urlRoutes from "./routes/url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/url", urlRoutes);

app.listen(PORT, async () => {
  await Log("backend", "info", "server", `Server started on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});
