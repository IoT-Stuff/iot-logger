import { expect } from 'chai';
import 'mocha';

const proxyquire = require('proxyquire').noPreserveCache()

import IoTLogger from '../../src/lib/iot-logger';

describe('IotLogger', () => {
  
  const filename = 'logger.log';
  
  before(() => {
    process.env.ApplicationName = 'ApplicationName';
    process.env.ApplicationVersion = 'ApplicationVersion';
  });

  it('Create instance', () => {
    const iotLogger = new IoTLogger(filename);
    expect(iotLogger).not.to.be.undefined;
  });

  it('Log debug', () => {
    const iotLogger = new IoTLogger(filename);
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