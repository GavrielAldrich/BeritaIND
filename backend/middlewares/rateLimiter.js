import { RateLimiter } from "limiter";

// 100 requests per 1 menit
const limiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: "minute",
});

const rateLimiterMiddleware = (req, res, next) => {
  if (limiter.tryRemoveTokens(1)) {
    next();
  } else {
    res.status(429).send("Too many requests. Please slow down.");
  }
};

export default rateLimiterMiddleware;
