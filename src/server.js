import express from "express";
import cors from "cors";
import { createDocument, getDocuments } from "./models/databaseActions.js";
import trackerRoutes from "./routes/tracker.js";
import { config } from './config/config.js';

const app = express();

app.use(cors());
app.use(express.json());

async function start() {
  try {
    const accountLogModel = { createDocument, getDocuments };

    // Routes
    app.use("/api/tracker", trackerRoutes({accountLogModel}));

    app.listen(config.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${config.PORT}`)
    );
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
}

start();