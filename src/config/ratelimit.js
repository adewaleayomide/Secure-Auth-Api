export const rateLimitOptions = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10 // limit each IP to 10 requests per windowMs
};