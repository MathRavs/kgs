import { Img } from '@react-email/components';
import { baseUrl } from '../constants/base-url.constant';
import * as React from 'react';

export const Logo = () => (
  <Img
    src={`${baseUrl}/static/linear-logo.png`}
    width="42"
    height="42"
    alt="Linear"
    style={logo}
  />
);

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};
