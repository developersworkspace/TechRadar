// Imports
import * as winston from 'winston';
import * as path from 'path';

// Imports configuration
import { config } from './config';

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug' }),
      new (winston.transports.File)({
        filename: path.join(config.logging.path, 'techradar_api.log'),
        level: 'debug'
      })
    ]
  });

// Exports
export { logger };