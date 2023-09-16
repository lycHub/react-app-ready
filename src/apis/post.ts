import request from "../utils/request";

function posts(): Promise<any> {
  return request.get('/posts');
}

export {
  posts
}