import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isFuture } from 'date-fns';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date) {
    console.log(date);
    return isFuture(date);
  }

  defaultMessage() {
    return 'Date must be in the future';
  }
}
