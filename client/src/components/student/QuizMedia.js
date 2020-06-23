import React from "react";

const QuizMedia = ({ media }) => {
  return (
    <div className="quiz__media">
      {media.mediaType.includes("image") && (
        <img src={`data:${media.mediaType};base64,${media.data}`} alt="" />
      )}
      {media.mediaType.includes("video") && (
        <video width="320" height="240" controls>
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
        <textarea rows="5" value={media.data}></textarea>
      )}
    </div>
  );
};

export default QuizMedia;
