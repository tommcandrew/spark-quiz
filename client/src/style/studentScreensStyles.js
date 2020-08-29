import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import paper from "../assets/images/paperbg.jpg";

const studentScreensStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		height: "100%",
		[theme.breakpoints.down("sm")]: {
			overflowY: "scroll"
		}
	},
	paperBackground: {
		backgroundColor: "#fff",
		//backgroundImage: `url(${paper})`,
		width: "60%",
		height: "95%",
		border: `3px solid ${theme.palette.primary.main}`,
		[theme.breakpoints.down("md")]: {
			width: "90%"
		},
		[theme.breakpoints.down("sm")]: {
			overflow: "scroll",
			width: "100%",
			height: "100%",
			border: "0"
		}
	},
	content: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		overflow: "hidden",
		padding: theme.spacing(5),
		[theme.breakpoints.down("sm")]: {
			overflow: "scroll",
			padding: theme.spacing(2)
		}
	},
	quizStartContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "column"
	},
	quizInfo: {
		margin: "0 auto",
		width: "100%",
		textAlign: "center",
		border: `2px solid ${theme.palette.primary.main}`,
		padding: "10px",
		paddingTop: "24px",
		[theme.breakpoints.down("sm")]: {
			padding: "5px",
			paddingTop: "14px"
		}
	},
	quizRules: {
		paddingLeft: "5px",
		paddingTop: "20px",
		[theme.breakpoints.down("sm")]: {
			paddingTop: "10px"
		}
	},
	buttons: {
		textAlign: "right",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		[theme.breakpoints.down("sm")]: {
			paddingTop: "10px",
			marginBottom: "10px"
		}
	},
	button: {
		width: "200px",
		marginTop: "15px",
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	},
	quiz__content: {
		width: "100%",
		display: "flex",
		flexDirection: "column"
	},
	quiz__info: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-end",
		borderBottom: `2px solid ${theme.palette.primary.main}`,
		[theme.breakpoints.down("sm")]: {
			border: 0
		}
	},
	quiz__questionContent: {
		overflowY: "scroll",
		overflowX: "hidden",
		maxHeight: "60vh",
		minHeight: "50vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: "20px",
		justifyContent: "space-between",
		border: `2px solid ${theme.palette.primary.main}`,
		[theme.breakpoints.down("md")]: {
			maxHeight: "75vh",
			minHeight: "70vh"
		}
	},
	quiz__question: {
		width: "100%",
		textAlign: "left",
		padding: "5px 10px",
		display: "flex",
		flexDirection: "column",
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		[theme.breakpoints.down("sm")]: {
			borderBottom: "0",
			padding: "5px 5px"
		}
	},
	quiz__medias: {
		display: "flex",
		flexDirection: "column",
		margin: "10px",
		[theme.breakpoints.down("sm")]: {
			maxWidth: "90%",
			alignItems: "center"
		}
	},
	quiz__media: {
		marginBottom: "5px",
		// border: `1px solid ${theme.palette.primary.main}`,
		width: "350px",
		height: "250px",
		[theme.breakpoints.down("sm")]: {
			maxWidth: "100%",
			alignItems: "center"
		}
	},
	media__image: {
		width: "100%"
	},
	quiz__options: {
		display: "flex",
		flexDirection: "column",
		width: "100%"
	},
	quiz__option: {
		maxWidth: "100%",
		borderTop: "1px solid black",
		transition: "background - color 200ms linear",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	quiz__optionRadio: {
		borderRight: `1px solid ${theme.palette.primary.main}`,
		paddingLeft: "10px"
	},
	quiz__progress: {
		marginTop: "30px",
		display: "flex",
		flexDirection: "column",
		border: `2px solid ${theme.palette.primary.main}`,
		[theme.breakpoints.down("sm")]: {
			marginTop: "10px"
		}
	},
	progressBar: {
		width: "100%",
		border: `2px solid ${theme.palette.primary.main}`,
		height: "15px"
	},
	quiz__progressDetails: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "5px 10px",
		[theme.breakpoints.down("sm")]: {
			padding: "3px 5px"
		}
	},
	progressBar__progress: {
		height: "100%",
		backgroundColor: theme.palette.primary.main
	},
	finsihQuizContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: "20px"
	}
}));

export default studentScreensStyles;
