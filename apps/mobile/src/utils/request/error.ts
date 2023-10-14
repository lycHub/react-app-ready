
import { Toast } from "antd-mobile";

const requestSuccess = (code: number) => code >= 200 && code < 300;

const CommonRequestErrorMsg = '请求失败';

const UnauthorizedCodes = [401];

/* message.config({
  maxCount: 1
}); */

function handleError(error: any) {
  let errorMsg = '';
  if (error.code) {
    errorMsg = CommonRequestErrorMsg;
  } else if (requestSuccess(error.status) && error.data) {
    errorMsg = error.data.msg || CommonRequestErrorMsg;
    handleServerError(error.data);
  }
  Toast.show({
    icon: 'fail',
    content: errorMsg
  })
  return Promise.reject(error);
}

function handleServerError(data: any) {
  if (UnauthorizedCodes.includes(data.code)) {
    console.log('server error>>>', data.code);
    if (import.meta.env.PROD) {
      // setAuthStorage();
      /* eslint @typescript-eslint/no-non-null-assertion: "off" */
      // location.replace(redirectHref(REACT_APP_WECOM_CORP_ID!, REACT_APP_WECOM_AGENT_ID!));
    }
  }
}

export { requestSuccess, handleError };
