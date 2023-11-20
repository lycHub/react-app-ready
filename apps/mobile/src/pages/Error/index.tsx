import { useMemo } from "react";
import { Button } from "antd";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import './index.scss';
import { Result } from "antd";
import { HomePath } from "../../router";

const tip = {
  title: '加载失败',
  description: ''
}

function ErrorPage({ errorInfo }: { errorInfo?: Record<string, unknown>; }) {
  const nav = useNavigate();
  const errorData: unknown = errorInfo || useRouteError();
  const errorTip = useMemo(() => {
    // 是否router抛出的错，比如loader或action里
    // console.log('isRouteErrorResponse>>>', isRouteErrorResponse(errorData), errorData);
    if (isRouteErrorResponse(errorData)) {
      if (errorData.data) {
        tip.title = errorData.data;
      }
      if (errorData.statusText) {
        tip.description = errorData.statusText;
      }
    } else { // axios error
      if (errorData.code) {
        tip.title = errorData.code;
      }
      if (errorData.message) {
        tip.description = errorData.message;
      }
    }
    return tip;
  }, [errorData])

  return (
    <Result
      className="error-page h-full"
      status="error"
      title={errorTip.title}
      subTitle={errorTip.description}
      extra={[
        <Button key="toHome" onClick={() => { nav(HomePath) }}>回首页</Button>,
        <Button key="retry" type="primary" onClick={() => { location?.reload() }}>重试</Button>,
      ]}
    />
  );
}
ErrorPage.displayName = 'ErrorPage';
export default ErrorPage;