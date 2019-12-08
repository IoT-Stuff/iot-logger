import { expect } from 'chai';
import 'mocha';
import IoTLogger from '../../src/lib/iot-logger';

describe('IotLogger', () => {

  it('Create instance', () => {
    const iotLogger = new IoTLogger();
    expect(iotLogger).not.to.be.undefined;
  });
});