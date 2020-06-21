import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as quizActions from "../../store/actions/quizActions";
import { List, ListItem, ListItemText, ListItemIcon, Typography,Paper, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Logo from "../../assets/logo1.png";
const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
	},
	listItem: {
		width: "100%",
		display: "flex",
		flexDirection: "row"
	},
	inline: {
		marginBottom: "5px",
		display: "block"
	}
}));

const PreviewQuestions = (props) => {
   const classes = useStyles();
	const dispatch = useDispatch();
	const quiz = useSelector((state) => state.quiz);

	const editQuestionHandler = (id) => {
		props.editQuestion(id);
	};

  const deleteQuestionHandler = (id) => {
		dispatch(quizActions.deleteQuestion(id));
	};

	return (
		<>
			{(!quiz.quizQuestions || quiz.quizQuestions.length === 0) && <p>Add a question</p>}
			{quiz.quizQuestions.length > 0 && (
				<List className={classes.list}>
					{quiz.quizQuestions.map((question, index) => (<ListItem key={index}>
						<Paper className={classes.listItem}>
            <ListItemIcon>
              <img src={Logo} style={{ width: "50px", height: "50px" }}/>
            </ListItemIcon>
            <ListItemText
          primary= {question.questionType}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
					  color="textPrimary"
              >
               Quesiton: {question.question}
              </Typography>
              <button onClick={() => deleteQuestionHandler(question._id)}>
				             delete
				           </button>
				           <button onClick={() => editQuestionHandler(question._id)}>
				             edit
				           </button>
            </React.Fragment>
          }
        /></Paper>
          </ListItem>))}
				</List>

			
				//         <li key={index} className="list-item">
				//           <p>Question Type: {question.questionType}</p>
				//           <p>Question: {question.question}</p>
				//           {question.questionType === "trueFalse" ? (
				//             <p>correct answer is {question.answers.trueFalseAnswer}</p>
				//           ) : (
				//             <div>
				//               Options:
				//               {question.answers.multipleChoiceOptions.map(
				//                 (option, i) => (
				//                   <p key={i}>-{option}</p>
				//                 )
				//               )}
				//               <p>
				//                 correct answer: {question.answers.multipleChoiceAnswer}
				//               </p>
			)}
		</>
	);
};
export default PreviewQuestions;
