import React, { useEffect } from 'react';
import { json, LoaderFunctionArgs, defer, useNavigate } from 'react-router-dom';
import { posts } from '../../apis';
import LoaderAwait from '../../components/LoaderAwait';
import { List } from 'antd-mobile';

function Posts({ data }: unknown) {
  // console.log('Posts len>>>>', data[0]);
  const nav = useNavigate();

  useEffect(() => {
    console.log('Posts mount>>>>')
  }, []);

  return (
    <div className="posts h-full" style={{ overflowY: 'auto' }}>
      <List header='Posts'>
        {
          data.map(item => <List.Item key={item.id} title={item.title} onClick={() => { nav('/post/' + item.id) }}>
            {item.body}
          </List.Item>)
        }
      </List>
    </div>
  )
}

// 只适用于不加载数据就看不了任何ui的页面
async function loader({ request }: LoaderFunctionArgs) {
  try {
    return defer({ data: posts() });
  } catch (error) {
    throw json('博客列表请求失败', { statusText: `Failed api: ${request.url}` });
  }
}

function Component() {
  return (
    <LoaderAwait>
      {data => <Posts data={data}></Posts>}
    </LoaderAwait>
  )
}


Component.displayName = 'Posts';
export { loader, Component }
