require("dotenv").config();

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

  if (allowedOrigins.indexOf(origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization, baggage, sentry-trace"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }

  return next();
};
