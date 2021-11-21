import { POST_ADD, POST_REMOVE, POST_EMPTY, USER_LOGIN, USER_LOGOUT, POSTS_UPDATE } from "./actions";

const postReducer = (state, action) => {
  switch(action.type){
    case POST_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case POST_REMOVE:
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.payload)
      }

    case POST_EMPTY:
        return {
          ...state,
          data: []
        }

    case POSTS_UPDATE: 
        return {
          ...state,
          data: [],
          data: state.data.concat(action.payload)
        }
    default:
      return state
  }
}

const authReducer = (state, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        userName: action.payload.userName,
        creationDate: action.payload.creationDate,
        postCount: action.payload.postCount,
        commentCount: action.payload.commentCount
      }
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        email: null,
        userName: null,
        creationDate: null,
        postCount: null,
        commentCount: null
      }
    default:
      return state
  }
}

export { postReducer, authReducer }