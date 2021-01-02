import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { Container } from '../helpers';
import { LanguageDropdown } from '@ui-kit';

const title = 'Language Dropdown';

const Story = () => {
  const setLanguage = (i) => alert(i);
  const defaultLang = 'en';

  return (
    <Container title={title}>
      <Grid container spacing={2} justify="center">
        <LanguageDropdown {...{ defaultLang, setLanguage }} />
      </Grid>
    </Container>
  );
};

storiesOf('Core/Atoms', module).add(title, Story);
