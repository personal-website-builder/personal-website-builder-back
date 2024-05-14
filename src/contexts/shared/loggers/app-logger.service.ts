import '@colors/colors';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { Logger } from 'winston';

@Injectable()
export class AppLogger extends ConsoleLogger {
  private winston: Logger;

  constructor(context?: string) {
    super(context);
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
