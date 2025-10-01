import express from "express";
import { createLog, getLogs,searchLogs } from "../controllers/trackerController.js";

export default function trackerRoutes({ accountLogModel }) {
  const router = express.Router();

  // GET /api/tracker
  router.get("/", (req, res) => getLogs(req, res, accountLogModel));

  // POST /api/tracker
  router.post("/", (req, res) => createLog(req, res, accountLogModel));

  // POST /api/tracker/search
  router.post("/search", (req, res) => searchLogs(req, res, accountLogModel));

  return router;
}