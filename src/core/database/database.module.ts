import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AbstractSequenceManagerRepository } from './repositories/abstract/abstract-sequence-manager.repository';
import { PrismaSequenceManagerRepository } from './repositories/implementation/prisma-sequence-manager.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: AbstractSequenceManagerRepository,
      useClass: PrismaSequenceManagerRepository,
    },
  ],
  exports: [PrismaService, AbstractSequenceManagerRepository],
})
export class DatabaseModule {}
