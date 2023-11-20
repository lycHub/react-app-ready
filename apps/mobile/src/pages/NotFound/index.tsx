import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import './index.scss';
import { Result } from "antd";
import { HomePath } from "../../router";

function NotFoundPage() {
  const nav = useNavigate();
  return (
    <Result
      className="not-found h-full"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={[
        <Button key="toHome" onClick={() => { nav(HomePath) }}>回首页</Button>,
      ]}
    />
  );
}
NotFoundPage.displayName = 'NotFoundPage';
export const Component = NotFoundPage;