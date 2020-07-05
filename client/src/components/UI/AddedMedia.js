import React from "react";
import {	Card, CardActions, Button
} from "@material-ui/core";
import { addQuestionModalStyles } from "../../style/modalStyles";
import DeleteIcon from '@material-ui/icons/Delete';




//text has a "mediaType" and all other file types have a "type"

const AddedMedia = ({ media, handleRemoveMedia, handleTextChange, index }) => {
  const classes = addQuestionModalStyles();
  return (
						<Card className={classes.card}>
      <div className={classes.addedMediaContainer} >
        {media.file.type && media.file.type.includes("image") && (
        <img
          className={classes.addedMedia}
          src={URL.createObjectURL(media.file)}
          alt=""
        />
      )}
      {media.file.type && media.file.type.includes("video") && (
        <video controls className={classes.addedMedia}>
          <source
            type={media.file.type}
            src={URL.createObjectURL(media.file)}
          />
        </video>
      )}
      {media.file.type && media.file.type.includes("audio") && (
        <audio controls className={classes.addedMedia}>
          <source
            src={URL.createObjectURL(media.file)}
            type={media.file.type}
          />
        </audio>
      )}
      {media.file.mediaType && media.file.mediaType.includes("text") && (
        <textarea
          rows="5"
          value={media.file.text}
          onChange={handleTextChange}
            data-index={index}
            className={classes.addedMedia}
        ></textarea>
      )}
              </div>
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => handleRemoveMedia(media.id)}>Remove</Button>
              </CardActions>
						</Card>





   
  
  );
};

export default AddedMedia;
