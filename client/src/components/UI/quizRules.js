import React from 'react'
import { Typography} from "@material-ui/core";

const quizRules = () => {
    return (
        <div>
             <Typography variant="h5" color="primary" >Rules:</Typography>
        <Typography variant="body" style={{marginBottomn: "10px", fontStyle: "italic", lineHeight: "1.5rem" }}>
          Turn off your cell (or put it on vibrate mode).
           <br></br>
          Do not start until we tell you so (do not even write your name).
          <br></br>
          Keep the testing material face down until we indicate you can start.
          <br></br>
          Know your section number and TA name.
          <br></br>
          Write your directory id (what you use to log on to the grades server, grace cluster) if requested.
         </Typography>
        </div>
    )
}

export default quizRules
