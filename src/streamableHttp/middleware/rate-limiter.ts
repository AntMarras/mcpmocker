import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  limit: 1000, // set to 1000 requests, limit each IP to 1000 requests per `window`
  standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers;  Use the latest standard format
  message: { success: false, error: 'Too many requests, please try again later.' },
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: false, // Count all the requests toward the limit
});
