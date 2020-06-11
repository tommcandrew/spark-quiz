import React, { useState } from "react";
import AddedMedia from "./AddedMedia";
import camelToSentence from "../utils/camelToSentence";

//some super basic styling
const styles = {
  wrapper: {
    border: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
  },
  /* hide default input (replaced with parent label element - see html) */
  fileInput: {
    display: "none",
  },
  /* style label to look like button */
  addMedia: {
    border: "1px solid rgba(0, 0, 0, 0.7)",
    padding: "2px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
};

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
const questionTypes = ["trueFalse", "multipleChoice"];

const AddQuestionModal = () => {
  const [addedMedia, setAddedMedia] = useState([]);
  const [questionType, setQuestionType] = useState("trueFalse");
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState(["", ""]);
  const [
    selectedMultipleChoiceOption,
    setSelectedMultipleChoiceOption,
  ] = useState(null);
  const [selectedTrueFalse, setSelectedTrueFalse] = useState();
  const [question, setQuestion] = useState("");

  const handleAddText = () => {
    setAddedMedia([
      ...addedMedia,
      { file: { type: "text/plain", text: "" }, id: Date.now() },
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
    addedMediaCopy[e.target.dataset.index].file.text = e.target.value;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionObject = {
      questionType: questionType,
      media: addedMedia,
      question: question,
      answers: {
        trueFalseAnswer:
          questionType === "trueFalse" ? selectedTrueFalse : null,
        multipleChoiceOptions:
          questionType === "multipleChoice" ? [...multipleChoiceOptions] : null,
      },
      multipleChoiceAnswer: selectedMultipleChoiceOption,
    };
    console.log(questionObject);
    //probably save questionObject to state here and close this modal
  };

  return (
    <div>
      <div style={styles.wrapper}>
        <div>
          <div>
            <h2>Add Question</h2>
            <div>
              <label htmlFor="myFile" style={styles.addMedia}>
                <input
                  id="myFile"
                  type="file"
                  onChange={handleAddFile}
                  style={styles.fileInput}
                  accept={supportedFileTypes.toString()}
                ></input>
                Add Media
              </label>
              <button onClick={handleAddText}>Add Text</button>
            </div>

            {addedMedia.map((media, index) => (
              <AddedMedia
                media={media}
                handleRemoveMedia={handleRemoveMedia}
                handleTextChange={handleTextChange}
                key={index}
                //passed into remove function to access item in addedMedia array in state
                index={index}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="questionType">Question type</label>
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
            <label htmlFor="question">Question</label>
            <textarea
              rows="4"
              value={question}
              onChange={handleQuestionChange}
              required
            ></textarea>
            {questionType === "trueFalse" && (
              <div>
                <div>
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
                </div>
                <div>
                  <input
                    type="radio"
                    value="false"
                    id="false"
                    checked={selectedTrueFalse === "false"}
                    onChange={handleTrueFalseSelect}
                    name="trueFalse"
                  />
                  <label htmlFor="false">False</label>
                </div>
              </div>
            )}
            {questionType === "multipleChoice" && (
              <div>
                <button type="button" onClick={handleAddMultipleChoiceOption}>
                  Add option
                </button>
                <div>
                  {multipleChoiceOptions.map((option, index) => (
                    <div key={index}>
                      <label htmlFor={index}>{index + 1}.</label>
                      <textarea
                        type="text"
                        value={option}
                        onChange={handleMultipleChoiceOptionChange}
                        //needed to access item in multipleChoiceOptions array in state on change
                        data-index={index}
                        required
                      ></textarea>
                      <input
                        type="radio"
                        value={index}
                        checked={
                          selectedMultipleChoiceOption === index.toString()
                        }
                        onChange={handleMultipleChoiceOptionSelect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p>Please select the correct answer.</p>
              <button type="submit">Done</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddQuestionModal;
