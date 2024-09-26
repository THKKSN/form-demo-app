const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  optionsSuccessStatus: 200 
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
