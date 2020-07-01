import { makeStyles } from "@material-ui/core/styles";

export const contactsScreenStyles = makeStyles((theme) => ({
    root: {
        flex: 1, 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
    },
    list: {
        height: "500px"


    }
}))