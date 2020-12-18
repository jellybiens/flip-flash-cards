import * as React from 'react';
import { Paper, PaperProps } from '@material-ui/core';

export const PaperCard: React.FC<Omit<PaperProps, 'variant' | 'square'>> = ({ ...props }) => (
  <Paper variant="outlined" square {...props} />
);
