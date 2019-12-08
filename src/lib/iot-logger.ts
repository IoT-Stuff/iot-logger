'use strict';

import uuid from 'uuid/v4';
import moment from 'moment';

export default class IoTLogger {
  constructor() {
    const loggingApplicationName = process.env.ApplicationName;
    const loggingApplicationVersion = process.env.ApplicationVersion;
    const transactionId = uuid();
  }

  debug(message, data = {}) {
    console.log(message);
  }

  warning(error) {
    console.log(error);
  }

  error(error) {
    console.log(error);
  }

  fatal(error) {
    console.log(error);
  }

  issue(error) {
    console.log(error);
  }
}