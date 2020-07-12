import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


const theme = createMuiTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
		body1: {
			fontSize: "1.1rem"
		}
	},
	palette: {
		primary: {
			light: "#475359",
			main: "#1A2930",
			dark: "#121c21",
			contrastText: "#fff"
		},
		secondary: {
			light: "#f8d764",
			main: "#F7CE3E",
			dark: "#ac902b",
			contrastText: "#000"
		},
		transition: {
			main: "#dc9596"
		},
		transition2: {
			main: "#883955"
		},
		background: {
			default: "#efefef"
		}
	}
});

let responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
