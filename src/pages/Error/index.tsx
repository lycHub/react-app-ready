import { useMemo } from "react";
import { Button, ErrorBlock } from "antd-mobile";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import './index.scss';

const tip = {
  title: '加载失败',
  description: ''
}

function ErrorPage() {
  const errorData: any = useRouteError();
  const errorTip = useMemo(() => {
    // 是否router抛出的错，比如loader或action里
    console.log('isRouteErrorResponse>>>', isRouteErrorResponse(errorData), errorData);
    if (isRouteErrorResponse(errorData)) {
      if (errorData.data) {
        tip.title = errorData.data;
      }
      if (errorData.statusText) {
        tip.description = errorData.statusText;
      }
    } else { // axios error
      /* if (errorData.code) {
        tip.title = errorData.code;
      }
      if (errorData.message) {
        tip.description = errorData.message;
      } */
    }
    return tip;
  }, [errorData])

  return (
    <div id="error-page" className="h-full">
      <ErrorBlock fullPage status='default' title={errorTip.title} description={errorTip.description}>
        <Link to="/home"><Button>返回首页</Button></Link>
      </ErrorBlock>
    </div>
  );
}
ErrorPage.displayName = 'ErrorPage';
export default ErrorPage;