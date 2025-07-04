import aj from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(403).json({ message: "Rate limit exceeded" });
      if (decision.reason.isBot())
        return res.status(403).json({ message: "Bot detected" });
    }

    next();
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};
