import { expect } from 'chai';
import 'mocha';

const proxyquire = require('proxyquire').noPreserveCache()

import winston from 'winston';
import { Format } from 'logform';

const { createLogger, format, transports } = winston;
import * as Transport from 'winston-transport';


import { IoTLogger, IoTLoggerConfig } from "../../src/lib/iot-logger";

describe('IotLogger', () => {
  
  const filename = 'logger.log';

  const iotLoggerFormat = format.printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] [${label}] ${level}: ${message}`;
  });

  let logFormat: Format;
  let loggerConfig: IoTLoggerConfig;
  
  before(() => {
    process.env.ApplicationName = 'ApplicationName';
    process.env.ApplicationVersion = 'ApplicationVersion';

    logFormat = format.combine(
      format.colorize(),
      format.label({ label: process.env.ApplicationName }),
      format.timestamp(),
      iotLoggerFormat
    );
  
    loggerConfig = {
      format: logFormat,
      fileName: undefined, 
      loggingApplicationName: process.env.ApplicationName,
      loggingApplicationVersion: process.env.ApplicationVersion
    }
  });

  it('Create instance', () => {
    const iotLogger = new IoTLogger(loggerConfig);
    expect(iotLogger).not.to.be.undefined;
  });

  it('Log debug', () => {
    const iotLogger = new IoTLogger(loggerConfig);
    expect(iotLogger).not.to.be.undefined;

    iotLogger.info('What rolls down stairs');
    iotLogger.info('What rolls down stairs');
    iotLogger.info('alone or in pairs,');
    iotLogger.info('and over your neighbors dog?');
    iotLogger.warning('Whats great for a snack,');
    iotLogger.info('And fits on your back?');
    iotLogger.error('Its log, log, log');    
  });

});