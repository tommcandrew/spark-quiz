import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import CarroisGothic from "../assets/fonts/CarroisGothic-Regular.ttf";
import bitwise from "../assets/fonts/bitwise.ttf";
import Selitta from "../assets/fonts/Selitta.ttf";

const theme = createMuiTheme({
	typography: {
		fontFamily: "bitwise",
		button: {
			fontFamily: 'CarroisGothic',
			textTransform: 'none'
		},
		h3: {
			fontFamily: "Selitta"
		},
		h4: {
			fontFamily: "Selitta"
		},
		h5: {
			fontFamily: "Selitta"
		}
	},
	overrides: {
		MuiCssBaseline: {
			"@global": {
				"@font-face": [ bitwise ]
			}
		}
	},
	palette: {
		primary: {
			light: "#767676",
			main: "#a9a9a9",
			dark: "#bababa",
			contrastText: "#000"
		},
		secondary: {
			light: "#b2292c",
			main: "#ff3b3f",
			dark: "#ff6265",
			contrastText: "#fff"
		},
		transition: {
			main: "#ceabf2"
		},
		background: {
			default: "#efefef"
		}
	}
});

let responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
