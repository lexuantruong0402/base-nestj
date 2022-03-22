import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const now = new Date().toISOString();
    Logger.log(
      `${req.method} ${req['hostname']}${req['originalUrl']} at ${now}`,
    );
    next();
  }
}
