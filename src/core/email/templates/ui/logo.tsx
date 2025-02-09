import { Img } from '@react-email/components';
import { baseUrl } from '../constants/base-url.constant';
import * as React from 'react';

export const Logo = () => (
  <Img
    src={`${baseUrl}/images/logo-color.svg`}
    width="75"
    height="75"
    alt="Linear"
    style={logo}
  />
);

const logo = {
  borderRadius: '50%',
};
