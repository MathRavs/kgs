import * as React from 'react';
import { Button as ReactEmailButton } from '@react-email/components';
import {
  borderRadius,
  colors,
  fonts,
} from '@core/email/templates/styles/base-style.constant';

interface Props {
  text: string;
  link: string;
  additionalStyle?: React.CSSProperties;
}

export const Button = ({ text, link, additionalStyle }: Props) => (
  <ReactEmailButton style={{ ...button, ...additionalStyle }} href={link}>
    {text}
  </ReactEmailButton>
);

const button = {
  backgroundColor: colors.lochinvar,
  borderRadius,
  color: colors.white,
  textAlign: 'center' as const,
  display: 'block',
  padding: '11px 23px',
  ...fonts.medium,
};
