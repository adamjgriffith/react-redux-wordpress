import { CALL_API, Schemas } from '../middleware/api'

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

// Fetches a single post from WordPress API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchPost = (postType, postSlug) => ({
  [CALL_API]: {
    types: [ POST_REQUEST, POST_SUCCESS, POST_FAILURE ],
    endpoint: `wp/v2/${postType}?_embed&slug=${postSlug}`,
    schema: Schemas.POST_ARRAY
  }
})

// Fetches a single post from WordPress API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadPost = (postType, postSlug) => (dispatch, getState) => {
  const post = getState().entities.posts[postSlug]
  if (post) {
    return null
  }

  return dispatch(fetchPost(postType, postSlug))
}

export const POSTS_REQUEST = 'POSTS_REQUEST'
export const POSTS_SUCCESS = 'POSTS_SUCCESS'
export const POSTS_FAILURE = 'POSTS_FAILURE'

// Fetches a page of posts.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchPosts = (postType, nextPageUrl) => ({
  postType,
  [CALL_API]: {
    types: [ POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.POST_ARRAY
  }
})

// Fetches a page of posts.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadPosts = (postType, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `wp/v2/${postType}?_embed`,
    pageCount = 0
  } = getState().pagination.postsByType[postType] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchPosts(postType, nextPageUrl))
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
