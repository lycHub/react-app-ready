import { json, LoaderFunctionArgs, defer, Link } from "react-router-dom";
import { post } from "../../apis";
import LoaderAwait from "../../components/LoaderAwait";
import { Button, Card } from "antd-mobile";
import { ErrorInfo } from "react";

function Post({ data }: any) {
  // console.log('Post>>>>', data);
  return (
    <Card className="post-detail" title={data.title}>
      <p>{data.body}</p>
      <Link to="/posts">
        <Button>返回列表</Button>
      </Link>
    </Card>
  );
}

async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    return defer({ data: post(params.id || "") });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "error";
    throw json("博客请求失败", {
      statusText: `Failed api: ${request.url}, ${errMsg}`,
    });
  }
}

function Component() {
  return <LoaderAwait>{(data) => <Post data={data}></Post>}</LoaderAwait>;
}

Component.displayName = "PostDetail";
export { loader, Component };
