import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import paper from "../assets/images/paperbg.jpg"

const studentScreensStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
		overflow: "hidden",
        height: "100%",
    },
    paperBackground: {
        backgroundColor: "#fff",
        //backgroundImage: `url(${paper})`,
        width: "80%",
        height: "95%",
       
        
        
    },
    content: {
        margin: "0 auto",
        padding: theme.spacing(10),
        paddingTop: theme.spacing(20),
        display: "flex",
        justifyContent: "center",
        height: "90%",
        width: "50%"

    }
}));

export default studentScreensStyles;
