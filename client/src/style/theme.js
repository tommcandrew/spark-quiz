import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
	typography: {
		button: {
			textTransform: "none"
		}
	},
	palette: {
		primary: {
			light: "#a8c8f0",
			main: "#103056",
			dark: "#091c34",
			contrastText: "#fff"
		},
		secondary: {
			light: "#F58F9D",
			main: "#ee425a",
			dark: "#710A18",
			contrastText: "#fff"
		},

		background: {
			default: "#e0e0e0"
		}
	}
});

let responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
