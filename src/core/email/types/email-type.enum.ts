export const EmailType = {
  ACCOUNT_CONFIRMATION_EMAIL: 'ACCOUNT_CONFIRMATION_EMAIL',
} as const;

export interface EmailOptionsByType {
  ACCOUNT_CONFIRMATION_EMAIL: {
    verificationUrl: string;
  };
}

export type EmailType = keyof typeof EmailType;
export type EmailOptions<T> = T extends EmailType
  ? EmailOptionsByType[T]
  : never;
