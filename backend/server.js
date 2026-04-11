require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Set high limit for base64 file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api', apiRoutes);

// Always return JSON for API failures (body-parser limits, unhandled errors, etc.)
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const status =
    typeof err.status === 'number' && err.status >= 400 && err.status < 600
      ? err.status
      : typeof err.statusCode === 'number' && err.statusCode >= 400 && err.statusCode < 600
        ? err.statusCode
        : 500;
  const message =
    err instanceof Error ? err.message : typeof err === 'string' ? err : 'Internal Server Error';
  if (status >= 500) {
    console.error('[express]', err);
  }
  res.status(status).json({
    error: message,
    ...(err.code ? { code: err.code } : {}),
  });
});

// MongoDB (Mongoose 8: legacy parser/topology options removed)
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10_000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    const server = app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
    const ms = 15 * 60 * 1000;
    server.timeout = ms;
    try {
      server.requestTimeout = ms;
      server.headersTimeout = ms + 60_000;
    } catch {
      /* optional on older Node */
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
