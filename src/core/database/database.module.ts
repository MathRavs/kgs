import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AbstractSequenceManagerRepository } from './repositories/abstract/abstract-sequence-manager.repository';
import { PrismaSequenceManagerRepository } from './repositories/implementation/prisma-sequence-manager.repository';
import { PrismaExceptionFilter } from '@core/database/exception-filters/prisma-exception.filter';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: AbstractSequenceManagerRepository,
      useClass: PrismaSequenceManagerRepository,
    },
    PrismaExceptionFilter,
  ],
  exports: [
    PrismaService,
    AbstractSequenceManagerRepository,
    PrismaExceptionFilter,
  ],
})
export class DatabaseModule {}
