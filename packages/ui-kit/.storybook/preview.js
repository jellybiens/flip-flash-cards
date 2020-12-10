import React from 'react';
import { addDecorator } from '@storybook/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../src/themes';

const Decorator = (fn) => <MuiThemeProvider theme={theme}>{fn()}</MuiThemeProvider>;

addDecorator(Decorator);
