import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


const theme = createMuiTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
	},
	palette: {
		primary: {
			light: "#6767af",
			main: "#103056",
			dark: "#2e2d6c",
			contrastText: "#fff"
		},
		secondary: {
			light: "#FF206E",
			main: "#f88128",
			dark: "#FF206E",
			contrastText: "#000"
		},
		transition: {
			light: "#E79CB4",
			main: "#ffd700",
			dark: "#731C37",
			contrastText: "#000"
		},
		
		background: {
			default: "#e0e0e0"
		}
	}
});

let responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
