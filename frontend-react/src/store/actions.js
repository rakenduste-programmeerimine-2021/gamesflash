export const POST_ADD = "POST_ADD"
export const POST_REMOVE = "POST_REMOVE"
export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_EMPTY = "USER_EMPTY"
export const USER_ADD = "USER_ADD"
export const USER_REMOVE = "USER_REMOVE"
export const POST_EMPTY = "POST_EMPTY"
export const POSTS_UPDATE = "POST_UPDATE"
export const COMMENT_ADD = "COMMENT_ADD"
export const COMMENT_EMPTY = "COMMENT_EMPTY"
export const COMMENTS_UPDATE = "COMMENTS_UPDATE"
export const SINGLE_POST = "SINGLE_POST"

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

export const updatePosts = array => ({
  type: POSTS_UPDATE,
  payload: array
})

export const addSinglePost = data => ({
  type: SINGLE_POST,
  payload: data
})

export const addComment = comment => ({
  type: COMMENT_ADD,
  payload: comment
})

export const updateComments = array => ({
  type: COMMENTS_UPDATE,
  payload: array
})

export const emptyComment = () => ({
  type: COMMENT_EMPTY
})

export const loginUser = data => ({
  type: USER_LOGIN,
  payload: data
})

export const logoutUser = () => ({
  type: USER_LOGOUT
})

export const emptyUser = () => ({
  type: USER_EMPTY
})

export const addUser = user => ({
  type: USER_ADD,
  payload: user
})

export const removeUser = user => ({
  type: USER_REMOVE,
  payload: user
})