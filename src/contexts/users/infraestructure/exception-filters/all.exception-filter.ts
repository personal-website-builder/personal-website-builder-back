import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    console.log(exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest() as Request;
    const response = ctx.getResponse() as Response;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      message: exception instanceof Error ? exception.message : exception,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(httpStatus).json(responseBody);
  }
}
