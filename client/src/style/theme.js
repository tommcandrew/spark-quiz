import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


const theme = createMuiTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
		body1: {
			fontSize: "1rem"
		}
	},
	palette: {
		primary: {
			light: "#6767af",
			main: "#42419B",
			dark: "#2e2d6c",
			contrastText: "#fff"
		},
		secondary: {
			light: "#415aaa",
			main: "#5E81F4",
			dark: "#7e9af6",
			contrastText: "#fff"
		},
		transition: {
			main: "#fe9195"
		},
		transition2: {
			main: "#8c8ecc"
		},
		background: {
			default: "#ebeff8"
		}
	}
});

let responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
