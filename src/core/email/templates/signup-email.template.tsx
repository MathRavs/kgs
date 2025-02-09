import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { fontFamily } from '@core/email/templates/styles/base-style.constant';
import { Logo } from '@core/email/templates/ui/logo';
import { Button } from '@core/email/templates/ui/button';

interface LinearLoginCodeEmailProps {
  verificationUrl: string;
}

export const LinearLoginCodeEmail = ({
  verificationUrl,
}: LinearLoginCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your login code for Linear</Preview>
    <Body style={main}>
      <Container style={container}>
        <Logo />
        <Heading style={heading}>
          Your account verification confirmation
        </Heading>
        <Text style={paragraph}>
          This link will only be valid for the next 5 minutes.
        </Text>
        <Section>
          <Button link={verificationUrl} text="Verify your account" />
        </Section>
      </Container>
    </Body>
  </Html>
);

LinearLoginCodeEmail.PreviewProps = {
  verificationUrl: 'https://google.mg',
} as LinearLoginCodeEmailProps;

export default LinearLoginCodeEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: fontFamily,
};

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph: React.CSSProperties = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};
