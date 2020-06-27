import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddedMedia from "./AddedMedia";
import camelToSentence from "../../utils/camelToSentence";
import * as quizActions from "../../store/actions/quizActions";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button, TextField } from "@material-ui/core";

//STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "50%",
  },
}));

//these two lists should probably be passed in to this component via props from the main QuizMaker component
const supportedFileTypes = [
  //image
  "image/jpeg",
  "image/png",
  "image/svg",
  //video
  "video/mp4",
  "video/webm",
  "video/ogg",
  //audio
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
];

const AddQuestionModal = ({ closeModal, quiz, questionToEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [addedMedia, setAddedMedia] = useState([]);
  const [questionType, setQuestionType] = useState("multipleChoice");
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState(["", ""]);
  const [
    selectedMultipleChoiceOption,
    setSelectedMultipleChoiceOption,
  ] = useState(null);
  const [selectedTrueFalse, setSelectedTrueFalse] = useState();
  const [question, setQuestion] = useState("");
  const [points, setPoints] = useState(null);
  const questionTypes = ["trueFalse", "multipleChoice"];
  const qToEdit = useSelector((state) =>
    state.quiz.quizQuestions.filter(
      (question) => question._id !== questionToEdit
    )
  );
  // getting the question to edit's id. Need to fill in the form fields

  //HANDLERS
  const handleAddText = () => {
    setAddedMedia([
      ...addedMedia,
      { file: { mediaType: "text/plain", data: "" }, id: Date.now() },
    ]);
  };

  //saves the file in state which results in preview displaying on page
  const handleAddFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size >= 16000000) {
      alert("File size limit is 16MB.");
      return;
    }
    if (!supportedFileTypes.includes(file.type)) {
      alert("File type not supported.");
      return;
    }
    setAddedMedia([
      ...addedMedia,
      {
        file: file,
        //need some kind of id to be able to remove media after adding it
        id: Date.now(),
      },
    ]);
  };

  const handleRemoveMedia = (mediaId) => {
    setAddedMedia(addedMedia.filter((media) => media.id !== mediaId));
  };

  const handleTextChange = (e) => {
    const addedMediaCopy = [...addedMedia];
    addedMediaCopy[e.target.dataset.index].file.data = e.target.value;
    setAddedMedia([...addedMediaCopy]);
  };

  const handleSelectQuestionType = (e) => {
    setQuestionType(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAddMultipleChoiceOption = () => {
    if (multipleChoiceOptions.length < 6) {
      setMultipleChoiceOptions([...multipleChoiceOptions, ""]);
    } else {
      alert("Maximum 6 options.");
    }
  };

  const handleTrueFalseSelect = (e) => {
    setSelectedTrueFalse(e.target.value);
  };

  const handleMultipleChoiceOptionChange = (e) => {
    const multipleChoiceOptionsCopy = [...multipleChoiceOptions];
    multipleChoiceOptionsCopy[e.target.dataset.index] = e.target.value;
    setMultipleChoiceOptions([...multipleChoiceOptionsCopy]);
  };

  const handleMultipleChoiceOptionSelect = (e) => {
    setSelectedMultipleChoiceOption(e.target.value);
  };

  const handlePointsChange = (e) => {
    setPoints(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //don't need id we added in backend so just sending file
    let addedText = addedMedia
      .filter(
        (media) =>
          media.file.mediaType === "text/plain" && media.file.data !== ""
      )
      .map((obj) => obj.file);
    const questionObject = {
      id: new Date().getUTCMilliseconds(),
      questionType: questionType,
      //adding text separately because FormData will ignore it
      media: [...addedText],
      question: question,
      answers: {
        trueFalseAnswer:
          questionType === "trueFalse" ? selectedTrueFalse : null,
        multipleChoiceOptions:
          questionType === "multipleChoice" ? [...multipleChoiceOptions] : null,
        multipleChoiceAnswer: selectedMultipleChoiceOption,
      },
      points: points,
    };
    const questionObjectStringified = JSON.stringify(questionObject);
    const formData = new FormData();
    formData.append("_id", quiz._id);
    formData.append("questionObject", questionObjectStringified);
    addedMedia.forEach((media) => {
      formData.append("file", media.file);
    });
    await dispatch(quizActions.addNewQuestion(formData));
    closeModal();
  };

  //RETURN
  return (
    <Grid container spacing={2} style={{ width: "80%" }}>
      <Grid item xs={12} className={classes.paper}>
        <Typography className={classes.paper} variant="h5">
          Add Question
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <label htmlFor="myFile">
            {/* need to hide the "input button for layout to look clean. Only Add media button should be left" */}
            <input
              id="myFile"
              type="file"
              onChange={handleAddFile}
              accept={supportedFileTypes.toString()}
            />
            Add Media
          </label>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddText}
          className={classes.paper}
        >
          Add Text
        </Button>
      </Grid>

      <Grid container item spacing={2} xl={12} style={{ minHeight: "150px" }}>
        {addedMedia.map((media, index) => (
          <Grid item xs={6} md={2} key={index}>
            <AddedMedia
              media={media}
              handleRemoveMedia={handleRemoveMedia}
              handleTextChange={handleTextChange}
              key={index}
              //passed into remove function to access item in addedMedia array in state
              index={index}
            />
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography htmlFor="questionType">Question type</Typography>
          <select
            id="questionType"
            value={questionType}
            onChange={handleSelectQuestionType}
          >
            {questionTypes.map((type, index) => (
              <option key={index} value={type}>
                {camelToSentence(type)}
              </option>
            ))}
          </select>
        </Paper>
      </Grid>
      <Grid item md={6} sm={6} xs={false} />
      <Grid item md={12}>
        <TextField
          variant="outlined"
          fullWidth
          label="Question"
          value={question}
          onChange={handleQuestionChange}
          required
        />
      </Grid>

      {questionType === "trueFalse" && (
        <Fragment>
          <Grid item md={6} sm={6}>
            <input
              type="radio"
              value="true"
              id="true"
              checked={selectedTrueFalse === "true"}
              onChange={handleTrueFalseSelect}
              name="trueFalse"
              required
            />
            <label htmlFor="true">True</label>
          </Grid>
          <Grid item md={6} sm={6}>
            <input
              type="radio"
              value="false"
              id="false"
              checked={selectedTrueFalse === "false"}
              onChange={handleTrueFalseSelect}
              name="trueFalse"
            />
            <label htmlFor="false">False</label>
          </Grid>
        </Fragment>
      )}

      {questionType === "multipleChoice" && (
        <Fragment>
          <Grid item xs={12} md={12}>
            <button type="button" onClick={handleAddMultipleChoiceOption}>
              Add option
            </button>
          </Grid>

          {multipleChoiceOptions.map((option, index) => (
            <Grid item md={6} xs={3} key={index}>
              <label htmlFor={index}>{index + 1}.</label>
              <textarea
                type="text"
                value={option}
                onChange={handleMultipleChoiceOptionChange}
                //needed to access item in multipleChoiceOptions array in state on change
                data-index={index}
                required
              />
              <input
                type="radio"
                value={index}
                checked={selectedMultipleChoiceOption === index.toString()}
                onChange={handleMultipleChoiceOptionSelect}
                required
              />
            </Grid>
          ))}
        </Fragment>
      )}

      <Grid item md={12} sm={12}>
        <p>Please select the correct answer.</p>
      </Grid>

      <Grid item md={12} xl={12}>
        {quiz.quizPointsSystem === "eachQuestion" && (
          <div>
            <label htmlFor="points">Points:</label>
            <input
              type="text"
              id="points"
              name="points"
              value={points}
              onChange={handlePointsChange}
            />
          </div>
        )}
      </Grid>

      <Grid item md={12} sm={12}>
        <button type="submit" onClick={handleSubmit}>
          Add question
        </button>
      </Grid>
    </Grid>
  );
};
export default AddQuestionModal;
