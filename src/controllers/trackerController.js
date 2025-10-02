import { createResponse } from "../utils/index.js";

export async function createLog(req, res, accountLogModel) {
  try {
    const { email, portalId, timestamp, url } = req.body;
    if (!email || !portalId || !timestamp || !url) {
      return res.status(400).json(
        createResponse({
          success: false,
          error: "email, portalName, portalId, timestamp and url are required",
        })
      );
    }

    const log = await accountLogModel.createDocument("logs", req.body);

    return res.status(201).json(
      createResponse({
        success: true,
        data: req.body,
        meta: { insertedId: log.insertedId },
      })
    );
  } catch (err) {
    console.error("Error saving log:", err);
    return res.status(500).json(
      createResponse({ success: false, error: "Internal Server Error" })
    );
  }
}

export async function getLogs(req, res, accountLogModel) {
  const { sortField, sortOrder, ...filters } = req.query;

  const sort =
    sortField && sortOrder
      ? { field: sortField, order: Number(sortOrder) }
      : undefined;

  try {
    const logs = await accountLogModel.getDocuments("logs", filters, sort);
    const totalCount = logs.length;

    return res.json(
      createResponse({
        success: true,
        data: logs,
        meta: { totalCount, sort: sort || null, filters: filters || null },
      })
    );
  } catch (err) {
    console.error("Error fetching logs:", err);
    return res.status(500).json(
      createResponse({ success: false, error: "Internal Server Error" })
    );
  }
}

export async function searchLogs(req, res, accountLogModel) {
  const { filter = {}, sort = {}, limit = 0 } = req.body;
  try {
    const logs = await accountLogModel.getDocuments("logs", filter, sort, limit);
    const totalCount = logs.length;

    return res.json(
      createResponse({
        success: true,
        data: logs,
        meta: { totalCount, sort, filter, limit },
      })
    );
  } catch (err) {
    console.error("Error filtering logs:", err);
    return res.status(500).json(
      createResponse({ success: false, error: "Internal Server Error" })
    );
  }
}