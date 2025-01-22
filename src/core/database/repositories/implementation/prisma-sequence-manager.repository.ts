import { Injectable } from '@nestjs/common';
import { AbstractSequenceManagerRepository } from '../abstract/abstract-sequence-manager.repository';
import { SequencesEnum } from '../../enums/sequences.enum';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaSequenceManagerRepository extends AbstractSequenceManagerRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async getNextVal(sequenceName: SequencesEnum): Promise<{ id: string }> {
    const result = await this.prismaService
      .$queryRaw`Select nextval(${sequenceName}) as id;`;
    return { id: result[0].id.toString() };
  }
}
