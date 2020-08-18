import React from "react";
import studentScreensStyles from "../../style/studentScreensStyles";

const QuizMedia = ({ media }) => {
  const classes = studentScreensStyles();
  return (
    <>
      {media.mediaType.includes("image") && (
        <img className={classes.media__image}
          src={`data:${media.mediaType};base64,${media.data}`} alt="" />
      )}
      {media.mediaType.includes("video") && (
        <video className={classes.media__image} controls>
          <source
            type={media.mediaType}
            src={`data:${media.mediaType};base64,${media.data}`}
          />
        </video>
      )}
      {media.mediaType.includes("audio") && (
        <audio controls>
          <source
            src={`data:${media.mediaType};base64,${media.data}`}
            type={media.mediaType}
          />
        </audio>
      )}
      {media.mediaType.includes("text") && (
        <div
          style={{width: "100%", height: "100%", textAlign:"left", padding: "3px 5px"}}
        >{media.data}</div>
      )}
    </>
  );
};

export default QuizMedia;
