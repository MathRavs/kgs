export const SequencesEnum = {
  URL: 'url_sequence',
} as const;

export type SequencesEnum = (typeof SequencesEnum)[keyof typeof SequencesEnum];
