import request from "../utils/request";

function albums(): Promise<unknown[]> {
  return request.get('/albums');
}

function album(id: string): Promise<unknown> {
  return request.get('/albums/' + id);
}

export {
  albums,
  album
}