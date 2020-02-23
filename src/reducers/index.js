import { combineReducers } from 'redux'
import PostsReducer from './reducer_posts'
import { reducer as formReducer } from 'redux-form'




const rootReducer = combineReducers({
  posts: PostsReducer,
  //make sure to always use form as a key and not anything else
  form: formReducer,
})

export default rootReducer
