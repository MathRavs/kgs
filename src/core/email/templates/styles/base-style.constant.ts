import * as React from 'react';

export const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

export const borderRadius = '3px';

export const fonts = {
  medium: {
    fontFamily,
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
  } as React.CSSProperties,
} as const;

export const colors = {
  white: '#ffffff',
  lochinvar: '#26767F',
} as const;
