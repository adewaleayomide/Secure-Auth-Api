import app from './app.js';
import connectDB from './config/db.js';
import { env } from './config/env.js';

const { PORT } = env;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();