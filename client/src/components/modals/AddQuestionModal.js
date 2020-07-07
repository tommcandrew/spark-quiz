import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddedMedia from "../UI/AddedMedia";
import * as quizActions from "../../store/actions/quizActions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreateIcon from "@material-ui/icons/Create";
import CustomSnackbar from "../../components/mui/Snackbar";
import V from "max-validator";
import { addQuestionValidation } from "../../utils/validation";
import { modalRootStyles, addQuestionModalStyles } from "../../style/modalStyles";
import camelToSentence from "../../utils/camelToSentence";
import supportedFileTypes from "../../utils/supportedFileTypes";
import { Grid, Typography, Button, TextField, Divider, Radio } from "@material-ui/core";

const AddQuestionModal = ({ closeModal, quiz, questionToEdit }) => {
	const rootClasses = modalRootStyles();
	const classes = addQuestionModalStyles();
	const dispatch = useDispatch();

	const [ validationError, setValidationError ] = useState("");
	const [ successMessage, setSuccessMessage ] = useState("");
	const [ addedMedia, setAddedMedia ] = useState([]);
	const [ retrivedMedia, setRetrivedMedia ] = useState([]);
	const [ questionType, setQuestionType ] = useState("multipleChoice");
	const [ multipleChoiceOptions, setMultipleChoiceOptions ] = useState([ "", "" ]);
	const [ selectedMultipleChoiceOption, setSelectedMultipleChoiceOption ] = useState(null);
	const [ selectedTrueFalse, setSelectedTrueFalse ] = useState("");
	const [ question, setQuestion ] = useState("");
	const [ points, setPoints ] = useState("");
	const questionTypes = [ "trueFalse", "multipleChoice" ];
	const qToEdit = useSelector((state) =>
		state.quiz.quizQuestions.find((question) => {
			return question._id === questionToEdit;
		})
	);

	useEffect(
		() => {
			if (qToEdit) {
				setQuestion(qToEdit.question);
				setQuestionType(qToEdit.questionType);
				setMultipleChoiceOptions(
					qToEdit.answers.multipleChoiceOptions ? qToEdit.answers.multipleChoiceOptions : [ "", "" ]
				);
				setSelectedMultipleChoiceOption(qToEdit.answers.multipleChoiceAnswer);
				setSelectedTrueFalse(qToEdit.answers.trueFalseAnswer);
				setPoints(qToEdit.points);
				qToEdit.media.map(async (media) => {
					if (media.mediaType === "text/plain") {
						setRetrivedMedia(
							retrivedMedia.push({ file: { mediaType: "text/plain", text: media.data }, id: Date.now() })
						);
					} else {
						let mediaData;
						if (typeof media.data === "string") {
							mediaData = media.data;
						} else {
							mediaData = new Buffer(media.data.data).toString("base64");
						}
						await urltoFile(
							`data:${media.mediaType};base64,${mediaData}`,
							`${media.name}`,
							`${media.mediaType}`
						).then((file) => {
							setRetrivedMedia(retrivedMedia.push({ file: file, id: Date.now() }));
						});
					}
				});
				setAddedMedia(retrivedMedia);
			}
		},
		[ qToEdit ]
	);

	//FUNCTIONS
	const urltoFile = async (url, filename, mimeType) => {
		return await fetch(url)
			.then(function(res) {
				return res.arrayBuffer();
			})
			.then(function(buf) {
				return new File([ buf ], filename, { type: mimeType });
			});
	};
	//Usage example:
	// urltoFile("data:text/plain;base64,aGVsbG8gd29ybGQ=", "hello.txt", "text/plain").then(function(file) {
	// 	console.log(file);
	// });

	//HANDLERS
	const handleAddText = () => {
		setAddedMedia([ ...addedMedia, { file: { mediaType: "text/plain", data: "" }, id: Date.now() } ]);
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
				id: Date.now()
			}
		]);
	};

	const handleRemoveMedia = (mediaId) => {
		setAddedMedia(addedMedia.filter((media) => media.id !== mediaId));
	};

	const handleTextChange = (e) => {
		const addedMediaCopy = [ ...addedMedia ];
		addedMediaCopy[e.target.dataset.index].file.data = e.target.value;
		setAddedMedia([ ...addedMediaCopy ]);
	};

	const handleSelectQuestionType = (e) => {
		setQuestionType(e.target.value);
	};

	const handleQuestionChange = (e) => {
		setQuestion(e.target.value);
	};

	const handleAddMultipleChoiceOption = () => {
		if (multipleChoiceOptions.length < 6) {
			setMultipleChoiceOptions([ ...multipleChoiceOptions, "" ]);
		} else {
			alert("Maximum 6 options.");
		}
	};

	const handleTrueFalseSelect = (e) => {
		setSelectedTrueFalse(e.target.value);
	};

	const handleMultipleChoiceOptionChange = (e) => {
		const multipleChoiceOptionsCopy = [ ...multipleChoiceOptions ];
		multipleChoiceOptionsCopy[e.target.dataset.index] = e.target.value;
		setMultipleChoiceOptions([ ...multipleChoiceOptionsCopy ]);
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
		setValidationError("");
		const result = V.validate({ question }, { question: "required|string|min:10|max:50" });
		if (result.hasError) {
			setValidationError(result.getError("question"));
			return;
		}
		if (questionType === "trueFalse") {
			let hasErr = false;
			if (selectedTrueFalse === "" || selectedTrueFalse=== null) {
				setValidationError("Please choose the correct answer");
				hasErr = true;
				return;
			}
			if (hasErr === true) return;
		} else {
			if (questionType === "multipleChoice") {
			let hasErr = false;
			multipleChoiceOptions.map((option) => {
				const result = V.validate({ option }, { option: "required|string|min:1|max:30" });
				if (result.hasError) {
					setValidationError(result.getError("option"));
					console.log(result.getError("option"));
					hasErr = true;
					return;
				}
			});
			if (hasErr === true) return;
		}
		
		}if (selectedMultipleChoiceOption === null && questionType === "multipleChoice") {
			setValidationError("Please chosse the correct answer");
			return;
		}
		if (quiz.quizPointsSystem === "eachQuestion") {
			const result = V.validate({ points }, { points: 'required|number|between:1,10' });
		if (result.hasError) {
			setValidationError(result.getError("points"));
			return;
		}
		}

		 let addedText = addedMedia
      .filter(
        (media) =>
          media.file.mediaType === "text/plain" && media.file.data !== ""
      )
      .map((obj) => obj.file);
    const questionObject = {
      id: qToEdit ? qToEdit._id : new Date().getUTCMilliseconds().toString(),
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
    qToEdit
      ? await dispatch(quizActions.editQuestion(formData))
      : await dispatch(quizActions.addNewQuestion(formData));
    closeModal();
		
	};

	//RETURN
	return (
		<div className={rootClasses.root}>
			{validationError !== "" && (
				<CustomSnackbar severity="error" message={validationError} handleClose={() => setValidationError("")} />
			)}
			<Grid container spacing={2} justify="flex-start" alignItems="flex-start">
				<Grid item xs={12}>
					<Typography variant="h5" color="secondary" style={{ textAlign: "center" }}>
						Add a Question
					</Typography>
					<Divider variant="middle" />
				</Grid>
				<Grid item xl={12} container spacing={3} justify="center">
					<Grid item xs={12} md={3}>
						<input
							onChange={handleAddFile}
							accept={supportedFileTypes.toString()}
							style={{ display: "none" }}
							id="myFile"
							type="file"
						/>
						<label htmlFor="myFile">
							<Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />}>
								Add Media
							</Button>
						</label>
					</Grid>
					<Grid item xs={12} md={3}>
						<Button
							variant="outlined"
							color="primary"
							component="span"
							onClick={handleAddText}
							startIcon={<CreateIcon />}>
							Add Text
						</Button>
					</Grid>
				</Grid>

				<Grid item xl={12} container spacing={3} justify="center">
					
					{addedMedia && addedMedia.map((media, index) => (
						<Grid item xs={6} md={4} key={index}>
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
					<Typography htmlFor="questionType">Question type</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<select id="questionType" value={questionType} onChange={handleSelectQuestionType}>
						{questionTypes.map((type, index) => (
							<option key={index} value={type}>
								{camelToSentence(type)}
							</option>
						))}
					</select>
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
							<Radio
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
							<Radio
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
						<Grid item md={12}>
							<Button variant="contained" color="secondary" onClick={handleAddMultipleChoiceOption}>
								Add option
							</Button>
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
								{/* <TextField
									variant="outlined"
									value={option}
									onChange={handleMultipleChoiceOptionChange}
									//needed to access item in multipleChoiceOptions array in state on change
									data-index={index}
									required
								/> */}
								<Radio
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
					<Typography variant="body1">Please select the correct answer.</Typography>
				</Grid>

				{quiz.quizPointsSystem === "eachQuestion" && (
					<Grid item md={12} xl={12}>
						<TextField
							id="points"
							label="points"
							value={points}
							onChange={handlePointsChange}
							variant="outlined"
						/>
					</Grid>
				)}

				<Grid item md={12}>
					<Button type="submit" onClick={handleSubmit} variant="contained" color="secondary">
						{qToEdit ? <>Update Question</> : <>Add question</>}
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};
export default AddQuestionModal;
