export const POST_ADD = "POST_ADD"
export const POST_REMOVE = "POST_REMOVE"
export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const POST_EMPTY = "POST_EMPTY"
export const POSTS_UPDATE = "POST_UPDATE"

export const addPost = post => ({
  type: POST_ADD,
  payload: post
})

export const removePost = id => ({
  type: POST_REMOVE,
  payload: id
})

export const emptyPost = () => ({
  type: POST_EMPTY
})

// Lisada siis uus konstant selle jaoks ja muuta ka reduceris
export const updatePosts = array => ({
  type: POSTS_UPDATE,
  payload: array
})

export const loginUser = data => ({
  type: USER_LOGIN,
  payload: data
})

export const logoutUser = () => ({
  type: USER_LOGOUT
})