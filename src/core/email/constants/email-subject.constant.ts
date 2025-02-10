import { EmailType } from '@core/email/types/email-type.enum';

export const EmailSubjectConstant: Record<EmailType, string> = {
  [EmailType.ACCOUNT_CONFIRMATION_EMAIL]: 'Account verification email',
} as const;
