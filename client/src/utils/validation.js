import V from "max-validator";


export const registerValidation = {
  name: 'required|string|min:2|max:30',
  email: 'required|email|max:50',
  password: 'required|string|min:2|max:30',
  password2: `required|string|min:2|max:30`
};

export const loginValidation = {
  email: 'required|email|max:50',
  password: 'required|string|min:2|max:30',
  
};

export const studentLoginValidation = {
  code: 'required|string|min:1'
};

export const createQuizValidation = {
  quizName: 'required|string|min:2|max:15',
  quizSubject: 'required|string|min:2|max:15'
}

export const quizOptionsValidation = {
  points: 'required|number|between:1,10',
  
};

// export const addQuestionValidation = ({
//   question,
// 			questionType,
// 			selectedTrueFalse,
// 			multipleChoiceOptions,
// 			selectedMultipleChoiceOption,
// 			quizPointsSystem,
//   points }) => {
//   let err;
// 		const result = V.validate({question}, {question: 'required|string|min:10|max:50'});
// 		if (result.hasError) {
// 			err= result.getError("question")
// 			return err
//   }
//     else {

// 		if (questionType === "trueFalse") {
// 			if (selectedTrueFalse === "") {
//         err = "Please choose the correct answer"
//         return
// 			}	
//     }
    
//     else {
//       	if (questionType === "multipleChoice") {
// 			multipleChoiceOptions.map(option => {
// 				const result = V.validate({option}, {option: 'required|string|min:1|max:10'});
// 		if (result.hasError) {
//       err = result.getError("option")
//       return
// 		}
// 			})
// 			if (selectedMultipleChoiceOption === null) {
//         err = "Please chosse the correct answer";
//         return
// 			}}}
      
//       if (quizPointsSystem === "eachQuestion") {
// 			if (points === "") err="Please select points for this question"
// 			return;
//       }
//       }
// 	return err
  
// }