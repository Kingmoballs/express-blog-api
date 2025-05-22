// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // to log full error stack
    logFormat
  ),
  transports: [
    new transports.Console(), // show logs in terminal
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // errors only
    new transports.File({ filename: 'logs/combined.log' }) // all logs
  ],
});

module.exports = logger;
