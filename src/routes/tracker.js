import express from "express";

export default function trackerRoutes({accountLogModel}) {
  const router = express.Router();

  // POST /api/tracker
  router.post("/", async (req, res) => {
    try {
      const { email, portalName, portatId, timestamp, url } = req.body;
      if (!email || !portalName || !portatId || !timestamp || !url) {
        return res.status(400).json({ error: "email, portalName, portatId, timestamp and url are required" });
      }
      const log = await accountLogModel.createDocument("logs", req.body);
      res.status(201).json({ message: "Log saved", data: log });
    } catch (err) {
      console.error("Error saving log:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // GET /api/tracker
  router.get("/", async (req, res) => {
    try {
      const logs = await accountLogModel.getDocuments("logs");
      res.json(logs);
    } catch (err) {
      console.error("Error fetching logs:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
}