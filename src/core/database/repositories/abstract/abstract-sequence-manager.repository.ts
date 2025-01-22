import { SequencesEnum } from '../../enums/sequences.enum';

export abstract class AbstractSequenceManagerRepository {
  abstract getNextVal(sequenceName: SequencesEnum): Promise<{ id: string }>;
}
