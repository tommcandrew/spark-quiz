import { createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import {deepPurple, amber} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#44456c',
      main: '#161748',
      dark: '#0f1032',
      contrastText: '#fff',
    },
    secondary: {
      light: '#998a66',
      main: '#806d40',
      dark: '#594c2c',
      contrastText: '#000',
    },
  }
});

let responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme



// color good: 161748;
