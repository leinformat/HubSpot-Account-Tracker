import express from "express";
import { createResponse } from "../utils/index.js";

export default function trackerRoutes({accountLogModel}) {
  const router = express.Router();

  // POST /api/tracker
  router.post("/", async (req, res) => {
    try {
      const { email, portatId, timestamp, url } = req.body;
      if (!email || !portatId || !timestamp || !url) {
        return res.status(400).json(
          createResponse({
            success: false,
            error:
              "email, portalName, portatId, timestamp and url are required",
          })
        );
      }
      const log = await accountLogModel.createDocument("logs", req.body);
      res.status(201).json(
        createResponse({
          success: true,
          data: req.body,
          meta: {
            insertedId: log.insertedId,
          },
        })
      );
    } catch (err) {
      console.error("Error saving log:", err);
      res.status(500).json(
        createResponse({
          success: false,
          error: "Internal Server Error",
        })
      );
    }
  });

  // GET /api/tracker
  router.get("/", async (req, res) => {
    const { sortField, sortOrder, ...filters } = req.query;

    // sortField and sortOrder are optional
    const sort = sortField && sortOrder ? { field: sortField, order: Number(sortOrder) } : undefined;

    try {
      const logs = await accountLogModel.getDocuments("logs", filters, sort);
      const totalCount = logs.length;
      res.json(
        createResponse({
          success: true,
          data: logs,
          meta: {
            totalCount,
            sort: sort || null,
            filters: filters || null,
          },
        })
      );
    } catch (err) {
      console.error("Error fetching logs:", err);
      res.status(500).json(
        createResponse({
          success: false,
          error: "Internal Server Error",
        })
      );
    }
  });

  return router;
}