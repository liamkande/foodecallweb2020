import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const FETCH_POST = 'FETCH_POST'
export const DELETE_POST = 'DELETE_POST'

const ROOT_URL = 'https://food-e-call-website.firebaseio.com'


export function createPost(props) {
  const request = axios.post(`${ROOT_URL}/data.json`, props)

  return {
    type: CREATE_POST,
    payload: request
  }
}
