import * as React from 'react';
import { boxShadow } from '@core/email/templates/styles/base-style.constant';
import { Container } from '@react-email/components';

export const CardContainer = ({ children }) => (
  <Container style={container}>{children}</Container>
);

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '560px',
  boxShadow,
  borderRadius: '8px',
};
