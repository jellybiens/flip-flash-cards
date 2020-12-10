import * as React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

export const Container: React.FC<{ title: string }> = ({ title, children }) => (
  <Box clone height="100vh">
    <Grid container direction="column" wrap="nowrap">
      <Grid item>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      {children}
    </Grid>
  </Box>
);
