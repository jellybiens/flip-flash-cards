import * as React from 'react';
import { useFormikContext } from 'formik';
import JSONPretty from 'react-json-pretty';
import { Grid, Box, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export const Container: React.FC<{ title: string }> = ({ title, children }) => {
  const vps = useViewportSize();

  const variant: Variant = (() => {
    switch (vps) {
      case 'xs': {
        return 'body2';
      }
      case 'sm': {
        return 'body1';
      }
      case 'md': {
        return 'h4';
      }
      default: {
        return 'h2';
      }
    }
  })();

  return (
    <Box clone style={{ backgroundColor: '#ffe57f' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant={variant}>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export const FormikStateValues = () => {
  const { values, errors } = useFormikContext();

  return (
    <div>
      <pre>
        Formik values state:
        <br />
        <JSONPretty id="values-pretty" data={JSON.stringify(values, null, 2)} />
      </pre>
      {!!errors && (
        <pre>
          Error values state:
          <br />
          <JSONPretty id="error-pretty" data={JSON.stringify(errors, null, 2)} />
        </pre>
      )}
    </div>
  );
};

type BreakpointOrNull = Breakpoint | null;

export function useViewportSize(): Breakpoint {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

type HeightWidth = {
  width: number;
  height: number;
};

export function useWindowSize(): HeightWidth {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState<HeightWidth>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
