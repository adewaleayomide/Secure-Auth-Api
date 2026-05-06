import { corsOptions } from "./config/cor.js";
import { hstsOptions } from "./config/hsts.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { contentSecurityPolicyOptions } from "./config/csp.js";
import rateLimit from "express-rate-limit";
import { rateLimitOptions } from "./config/ratelimit.js";
import routes from "./routes/index.js";

const app = express();

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

app.disable("x-powered-by");
app.use(express.json({ limit: '10kb'}));
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(helmet());
app.use(helmet.hsts(hstsOptions));
app.use(helmet.contentSecurityPolicy(contentSecurityPolicyOptions));
app.use(compression());
app.use(rateLimit(rateLimitOptions));
routes(app);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
