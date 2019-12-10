'use strict';

import uuid from 'uuid/v4';
import moment from 'moment';
import winston from 'winston';

const { createLogger, format, transports } = winston;

const iotLoggerFormat = format.printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`;
});


export default class IoTLogger {

  logger: winston.Logger;

  constructor(filename: string) {
    const loggingApplicationName = process.env.ApplicationName;
    const loggingApplicationVersion = process.env.ApplicationVersion;
    const transactionId = uuid();

    const logFormat = format.combine(
      format.colorize(),
      format.label({ label: loggingApplicationName }),
      format.timestamp(),
      iotLoggerFormat
    );

    this.logger = winston.createLogger({
      format: logFormat, 
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename })
      ]
    });
  }

  debug(message: string, data = {}) {
    this.logger.info(message);
  }

  warning(message: string) {
    this.logger.warn(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(error: string) {
    this.logger.error(error);
  }
}