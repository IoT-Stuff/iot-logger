import { expect } from 'chai';
import 'mocha';
import fs from 'fs';
import winston from 'winston';
import sinon from 'sinon';

const proxyquire = require('proxyquire').noPreserveCache()

import * as defaultLogger from "../../src/index";

describe('Default IotLogger', () => {
  
  const filename = 'logger.log';
  let sandbox: sinon.SinonSandbox;
  let winstonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Create instance', () => {
    const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1');
    expect(iotLogger).not.to.be.undefined;
  });

  it.skip('Log debug to console', () => {

    const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1');
    expect(iotLogger).not.to.be.undefined;

    const winstonInfoSpy = sinon.spy(winston, 'log');
    
    iotLogger.info('What rolls down stairs');

    
    expect(winstonInfoSpy.calledOnce).to.be.true;
    // iotLogger.warning('Whats great for a snack,');
    // iotLogger.error('Its log, log, log');    

  });

  
  it('Log debug to file', async () => {
    const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1', filename);
    expect(iotLogger).not.to.be.undefined;

    iotLogger.info('What rolls down stairs');
    iotLogger.info('What rolls down stairs');
    iotLogger.info('alone or in pairs,');
    iotLogger.info('and over your neighbors dog?');
    iotLogger.warning('Whats great for a snack,');
    iotLogger.info('And fits on your back?');
    iotLogger.error('Its log, log, log');    

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(fs.existsSync(filename)).to.be.true;
    //expect(fs.readFileSync(filename)).to.equal('...')
  });

});