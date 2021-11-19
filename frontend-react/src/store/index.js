import { createContext, useReducer } from "react";
import { postReducer, authReducer } from "./reducer";
import combineReducers from "react-combine-reducers"

const initialPosts = {
  data: []
}

const initialAuth = {
  token: null,
  user: null
}

const [combinedReducer, initialState] = combineReducers({
  posts: [postReducer, initialPosts],
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