import { POST_ADD, POST_REMOVE, POST_EMPTY, USER_LOGIN, USER_LOGOUT, POSTS_UPDATE, COMMENTS_UPDATE, COMMENT_EMPTY, COMMENT_ADD, SINGLE_POST } from "./actions";

const postReducer = (state, action) => {
  switch(action.type){
    case POST_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      }

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

const singlePostReducer = (state, action) => {
  switch(action.type){
    case SINGLE_POST:
      return {
        ...state,
        
        userName: action.payload[0].userName,
        postID: action.payload[0].postID,
        postTitle: action.payload[0].postTitle,
        content: action.payload[0].content,
        category: action.payload[0].category,
        creationDate: action.payload[0].creationDate
      }
    default:
      return state
  }
}

const commentReducer = (state, action) => {
  switch(action.type){
    case COMMENT_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      }

    case COMMENTS_UPDATE: 
        return {
          ...state,
          data: [],
          data: state.data.concat(action.payload)
        }  

    case COMMENT_EMPTY:
        return {
          ...state,
          data: []
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
        aCC: action.payload.aCC,
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

export { postReducer, commentReducer, singlePostReducer, authReducer }