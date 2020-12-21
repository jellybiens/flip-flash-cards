import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CircleButton } from '../src'
import theme from '../src/themes';


const scaleFactor = 0.5;

const useStyles = makeStyles(() => ({
  viewButton:{
    position: 'absolute',
    top: 20,
    right: 20,
  },
  root:{
    display: 'flex', width: '100%'
  },
  container:{
    flex: 1,
    maxWidth: '100%',
    backgroundColor: '#7f7f7f',
    display: 'flex',
    flexWrap: 'wrap',
  },
  viewPortPadding:{
    padding: 10,
  },
  viewPortSpacing:{
    display: 'flex', 
    alignItems: 'center' 
  },
  screenOutline: {
    border: '10px solid black',
    borderRadius: 4,
  },
  screenOutput: {
    transform: `scale(${scaleFactor})`,
    transformOrigin: 'top left',
    overflowY: 'scroll',
    overflowX: 'auto',
  },
  button: {
    margin: 'auto',
  },
}))

export const decorators = [
  (Story) => {
    const cs = useStyles();
    const [view, setView] = React.useState(true);
    const [rotate, setRotate] = React.useState([false, false, true, false, false]);
    const rotateScreen = (i) => {
      const screens = [...rotate];
      screens[i] = !screens[i];
      setRotate(screens);
    }

    if(view) {
      return (
          <MuiThemeProvider theme={theme}>
              <CircleButton
                iconName="flip" 
                colour="cyan"
                onClick={() => setView(!view)}
                className={cs.viewButton} 
              />
              <Story />
          </MuiThemeProvider>
      );
    }

    return (
      <div className={cs.root}>
        <MuiThemeProvider theme={theme}>
          <CircleButton
            iconName="flip" 
            colour="cyan"
            onClick={() => setView(!view)}
            className={cs.viewButton} 
          />
        </MuiThemeProvider>
        <div
          className={cs.container}
        >
          {viewports.map((v, i) => {
            return (
              <div
                key={v.name}
                className={cs.viewPortPadding}
              >
                <Grid container spacing={1} style={{ width: 'min-content' }} >
                  <Grid item xs={12}>
                    <span
                      style={{
                        color: 'hsl(0, 0%, 98%)',
                      }}
                    >
                      {v.name}
                    </span>
                    <span
                      style={{
                        marginLeft: 10,
                        color: 'hsl(0,0%,90%)',
                      }}
                    >
                      ({v.styles.width} x {v.styles.height}) {scaleFactor * 100}%
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <button onClick={() => rotateScreen(i)}>Rotate</button>
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      className={cs.screenOutline}
                      style={{
                        width: (!rotate[i] ? v.styles.width : v.styles.height) * scaleFactor,
                        height: (rotate[i] ? v.styles.width : v.styles.height) * scaleFactor,
                      }}
                    >
                      <div
                        className={cs.screenOutput}
                        style={{
                          width: !rotate[i] ? v.styles.width : v.styles.height,
                          height: rotate[i] ? v.styles.width : v.styles.height,
                        }}
                      >
                        <MuiThemeProvider theme={createMuiTheme({...theme, ...v.theme})}>
                          <Story />
                        </MuiThemeProvider>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
  )},
];




// exemplary viewports
const viewports = [
  // iphone5:
  {
    name: 'iPhone 5',
    styles: {
      height: 568,
      width: 320,
    },
    type: 'mobile',
    theme: {
        breakpoints: {
            values: {
                xs: 0,
                sm: 1920,
                md: 1920,
                lg: 1920,
                xl: 1920,
            },
        },
     },
     xs: 3,
  },
  // pixel3xl:
  {
    name: 'Pixel 3XL',
    styles: {
      height: 847,
      width: 412,
    },
    type: 'mobile',
    theme: {
        breakpoints: {
            values: {
                xs: 0,
                sm: 1,
                md: 1920,
                lg: 1920,
                xl: 1920,
            },
        },
     },
     xs: 3,
  },
  // ipad:
  {
    name: 'iPad',
    styles: {
      height: 1024,
      width: 768,
    },
    type: 'tablet',
    theme: {
        breakpoints: {
            values: {
                xs: 0,
                sm: 1,
                md: 2,
                lg: 1920,
                xl: 1920,
            },
        },
     },
     xs: 3,
  },
  // macbookAir:
  {
    name: 'MacBook Air',
    styles: {
      height: 900,
      width: 1440,
    },
    type: 'tablet',
    theme: {
        breakpoints: {
            values: {
                xs: 0,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 1920,
            },
        },
     },
     xs: 12,
  },
  // desktop:
  {
    name: 'Desktop (HD)',
    styles: {
      height: 1080,
      width: 1920,
    },
    type: 'tablet',
    theme: {
        breakpoints: {
            values: {
                xs: 0,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
            },
        },
     },
     xs: 12,
  },
];

