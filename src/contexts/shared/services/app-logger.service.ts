import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import * as winston from 'winston';
import '@colors/colors';

@Injectable()
export class AppLoggerService implements LoggerService {
  private winston: Logger;
  private context: string = AppLoggerService.name;

  constructor() {
    this.winston = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'personal-website-builder-back' },
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          dirname: 'logs',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'warn.log',
          dirname: 'logs',
          level: 'warn',
        }),
        new winston.transports.File({
          filename: 'info.log',
          dirname: 'logs',
          level: 'info',
        }),
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.json(),
            winston.format.printf((info) => {
              return `[${this.context.yellow}] ${info.timestamp.toString().cyan} ${info.level} ${info.message} ${JSON.stringify(info[0]) ?? ''}`;
            }),
          ),
        }),
      ],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.winston.info(message, optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.winston.log('error', message, optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.winston.warn(message, optionalParams);
  }
}
