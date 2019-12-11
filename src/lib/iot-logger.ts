'use strict';

import uuid from 'uuid/v4';
import moment from 'moment';
import winston from 'winston';
import { Format } from 'logform';

const { createLogger, format, transports } = winston;
import * as Transport from 'winston-transport';

export interface IoTLoggerConfig {
  loggingApplicationName: string,
  loggingApplicationVersion: string,
  format: Format;
  fileName?: string;
}

export class IoTLogger {

  logger: winston.Logger;

  constructor(loggerConfig: IoTLoggerConfig) {
    const transactionId = uuid();

    let transports: Transport[] = [
      new winston.transports.Console(),
    ]

    if (loggerConfig.fileName) {
      transports.push(
        new winston.transports.File({ filename: loggerConfig.fileName })
      );
    }

    this.logger = winston.createLogger({
      format: loggerConfig.format,
      transports
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