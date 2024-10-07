const getCorsHeaders = (origin: string | undefined): Record<string, string> => {
  // Default options
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods":
      process.env.ALLOWED_METHODS || "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers":
      process.env.ALLOWED_HEADERS || "Content-Type,Authorization",
    "Access-Control-Allow-Credentials": "true",
  };

  // If no allowed origin is set, default to server's origin
  if (!process.env.ALLOWED_ORIGIN || !origin) {
    return headers;
  }

  // If allowed origin is set, check if origin is in allowed origins
  const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

  // Validate server origin
  if (allowedOrigins.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  // Return result
  return headers;
};

export default getCorsHeaders;
