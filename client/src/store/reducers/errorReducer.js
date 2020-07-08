import {GET_ERRORS, CLEAR_ERRORS, LOADED, LOADING} from '../actions/errorActions';

const initalState = {
  errorMsg: "",
  errorStatus: null,
  errorId: null,
  loading: false,
  loadingMsg: "Please wait"
};

export default function (state = initalState, action) {
  switch (action.type) {
    case LOADING: 
      return {...state,
        loading: true,
        loadingMsg: action.msg
      }
    case LOADED: 
      return {...state,
        loading: false,
        loadingMsg: ""
      }
    case GET_ERRORS:
      return {...state,
        errorMsg: action.payload.msg.msg,
        errorStatus: action.payload.status,
        errorId: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {...state,
        errorMsg: {},
        errorStatus: "",
        errorId: null,
      };
    default:
      return state;
  }
}
