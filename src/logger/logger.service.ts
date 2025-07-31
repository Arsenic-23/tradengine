import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends NestLogger {
  log(message: string, context?: string) {
    super.log(`[INFO] ${message}`, context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(`[ERROR] ${message}`, trace, context);
  }

  warn(message: string, context?: string) {
    super.warn(`[WARN] ${message}`, context);
  }

  debug(message: string, context?: string) {
    super.debug(`[DEBUG] ${message}`, context);
  }

  verbose(message: string, context?: string) {
    super.verbose(`[VERBOSE] ${message}`, context);
  }
}
