import { IoTLogger, IoTLoggerConfig } from "./lib/iot-logger";
import winston from 'winston';
const { createLogger, format, transports } = winston;
import { Format } from 'logform';

const iotLoggerFormat = format.printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`;
});

export function getIoTDefaultLogger(loggingApplicationName: string, loggingApplicationVersion: string = '1', fileName?: string): IoTLogger {

  const logFormat = format.combine(
    format.colorize(),
    format.label({ label: loggingApplicationName }),
    format.timestamp(),
    iotLoggerFormat
  );
  const loggerConfig: IoTLoggerConfig = {
    format: logFormat,
    fileName, 
    loggingApplicationName, 
    loggingApplicationVersion
  }
  
  return new IoTLogger(loggerConfig);
}