import request from "../utils/request";

function xmData(): Promise<any[]> {
  return request.get(
    "/api/jc/queryAllData?app=web&group=web-m&key=mFooterConfig",
    {
      baseURL: "https://m.ximalaya.com/web-config",
    }
  );
}

export { xmData };
