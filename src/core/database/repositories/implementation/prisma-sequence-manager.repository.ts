import { Inject, Injectable } from '@nestjs/common';
import { AbstractSequenceManagerRepository } from '../abstract/abstract-sequence-manager.repository';
import { SequencesEnum } from '../../enums/sequences.enum';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaSequenceManagerRepository extends AbstractSequenceManagerRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async getNextVal(sequenceName: SequencesEnum): Promise<{ id: string }> {
    const result = await this.prismaService
      .$queryRaw`Select nextval(${sequenceName}) as id;`;
    return { id: result[0].id.toString() };
  }
}
