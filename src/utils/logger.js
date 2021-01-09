import {
  transports as _transports,
  format as _format,
  createLogger,
  config
} from 'winston';
import { config as _config } from 'dotenv';

_config({ path: '../config/config.env' });

const transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(new _transports.Console());
} else {
  transports.push(
    new _transports.Console({
      format: _format.combine(_format.cli(), _format.splat())
    })
  );
}

const LoggerInstance = createLogger({
  level: process.env.LOG_LEVEL,
  levels: config.npm.levels,
  format: _format.combine(
    _format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    _format.errors({ stack: true }),
    _format.splat(),
    _format.json()
  ),
  transports
});

export default LoggerInstance;
