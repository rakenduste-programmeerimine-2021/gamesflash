import { createContext, useReducer } from "react";
import { postReducer, commentReducer, singlePostReducer, authReducer } from "./reducer";
import combineReducers from "react-combine-reducers"

const initialPosts = {
  data: []
}

const initialAuth = {
  token: null,
  user: null
}

const initialSPost = {
  userName: null,
  postID: null,
  postTitle: null,
  content: null,
  category: null,
  creationDate: null
}

const initalComments = {
  data: []
}

const [combinedReducer, initialState] = combineReducers({
  posts: [postReducer, initialPosts],
  post: [singlePostReducer, initialSPost],
  comments: [commentReducer, initalComments],
  auth: [authReducer, initialAuth]
})

export const Context = createContext(initialState)

function Store({ children }){
  const [state, dispatch] = useReducer(combinedReducer, initialState)

  return (
    <Context.Provider value={[ state, dispatch ]}>
      { children }
    </Context.Provider>
  )
}

export default Store