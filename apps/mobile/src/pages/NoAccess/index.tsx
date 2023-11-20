import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import './index.scss';
import { Result } from "antd";
import { HomePath } from "../../router";

function NoAccessPage() {
  const nav = useNavigate();
  return (
    <Result
      className="no-access h-full"
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={[
        <Button key="toHome" onClick={() => { nav(HomePath) }}>回首页</Button>,
      ]}
    />
  );
}
NoAccessPage.displayName = 'NoAccessPage';
export const Component = NoAccessPage;