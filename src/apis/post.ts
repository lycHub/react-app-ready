import request from "../utils/request";

function posts(): Promise<any> {
  return request.get('/posts');
}

function post(id: string): Promise<any> {
  return request.get('/posts/' + id);
}

export {
  posts,
  post
}