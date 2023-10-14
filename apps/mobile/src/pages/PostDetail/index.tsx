import React from 'react';
import { json, LoaderFunctionArgs, defer, Link } from 'react-router-dom';
import { post } from '../../apis';
import LoaderAwait from '../../components/LoaderAwait';
import { Button, Card, ActionSheet } from 'antd-mobile';

const ununsed = 'aa';
function Post({ data }: any) {
  // console.log('Post>>>>', data);
  return (
    <Card
      className="post-detail"
      title={data.title}
    >
      <p>{data.body}</p>
      <Link to="/posts">
        <Button >
          返回列表
        </Button>
      </Link>
    </Card>
  )
}

async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    return defer({ data: post(params.id) });
  } catch (error) {
    throw json('博客请求失败', { statusText: `Failed api: ${request.url}` });
  }
}


function Component() {
  return (
    <LoaderAwait>
      {data => <Post data={data}></Post>}
    </LoaderAwait>
  )
}

Component.displayName = 'PostDetail';
export { loader, Component }
