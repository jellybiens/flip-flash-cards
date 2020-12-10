import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Box, Button, Typography } from '@material-ui/core';

const Container: React.FC<{ title: string }> = ({ title, children }) => (
  <Box clone height="100vh">
    <Grid container direction="column" wrap="nowrap">
      <Grid item>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      {children}
    </Grid>
  </Box>
);

const Story = () => {
  return (
    <Container title="Add Button">
      <Grid container spacing={10} justify="center">
        <Grid item>
          <Button>asdasdsads</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add('Background', Story);
