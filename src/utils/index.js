export function createResponse({ success, data = null, meta = null, error = null }) {
  const body = { success };

  if (data !== null) body.data = data;
  if (meta !== null) body.meta = meta;
  if (error !== null) body.error = error;

  return body;
}