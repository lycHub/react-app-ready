import request from "../utils/request";

function albums(): Promise<any> {
  return request.get('/albums');
}

function album(id: string): Promise<any> {
  return request.get('/albums/' + id);
}

export {
  albums,
  album
}