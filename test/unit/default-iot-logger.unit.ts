import { expect } from 'chai';
import 'mocha';
import fs from 'fs';
import sinon from 'sinon';

import winston from 'winston';

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

  it.only('Log debug to console', () => {

    const message: string = 'Info message';
    const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1');
    const loggerSpy = sinon.spy(iotLogger.logger, 'info');

    iotLogger.debug(message);

    expect(iotLogger).not.to.be.undefined;
    expect(loggerSpy.calledOnce).to.be.true;
  });

  it.only('Log info to console', () => {

    const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1');
    const message: string = 'Info message';
    const loggerSpy = sinon.spy(iotLogger.logger, 'info');

    iotLogger.info(message);

    expect(iotLogger).not.to.be.undefined;
    expect(loggerSpy.calledOnce).to.be.true;
  });

  it.only('Log warn to console', () => {

    const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1');
    const message: string = 'Info message';
    const loggerSpy = sinon.spy(iotLogger.logger, 'warn');

    iotLogger.warning(message);

    expect(iotLogger).not.to.be.undefined;
    expect(loggerSpy.calledOnce).to.be.true;
  });

  it.only('Log error to console', () => {

    const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1');
    const message: string = 'Info message';
    const loggerSpy = sinon.spy(iotLogger.logger, 'error');

    iotLogger.error(message);

    expect(iotLogger).not.to.be.undefined;
    expect(loggerSpy.calledOnce).to.be.true;
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