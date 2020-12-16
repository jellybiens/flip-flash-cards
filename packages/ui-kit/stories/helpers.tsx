import * as React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

export const Container: React.FC<{ title: string }> = ({ title, children }) => (
  <Box clone height="100vh" style={{ backgroundColor: '#ffe57f' }}>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </Box>
);
