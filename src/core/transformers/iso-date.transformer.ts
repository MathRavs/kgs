import { isValid, parseISO } from 'date-fns';
import { BadRequestException } from '@nestjs/common';

export const transformToIsoDateOrUndefined = (date?: string): string => {
  if (!date) {
    return undefined;
  }
  const isoDate = parseISO(date);
  if (!isValid(isoDate)) {
    throw new BadRequestException('Invalid date format. Use ISO 8601.');
  }
  return date;
};
