import React from "react";

const styles = {
  addedImage: {
    maxWidth: "50%",
  },
};

const AddedMedia = ({ media, handleRemoveMedia, handleTextChange, index }) => {
  return (
    <div>
      {media.file.type.includes("image") && (
        <img
          style={styles.addedImage}
          src={URL.createObjectURL(media.file)}
          alt=""
        />
      )}
      {media.file.type.includes("video") && (
        <video width="320" height="240" controls>
          <source
            type={media.file.type}
            src={URL.createObjectURL(media.file)}
          />
        </video>
      )}
      {media.file.type.includes("audio") && (
        <audio controls>
          <source
            src={URL.createObjectURL(media.file)}
            type={media.file.type}
          />
        </audio>
      )}
      {media.file.type.includes("text") && (
        <textarea
          rows="5"
          value={media.file.text}
          onChange={handleTextChange}
          data-index={index}
        ></textarea>
      )}
      <button onClick={() => handleRemoveMedia(media.id)}>Remove</button>
    </div>
  );
};

export default AddedMedia;
