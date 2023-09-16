import React from 'react';
import { json, LoaderFunctionArgs, defer, useNavigate } from 'react-router-dom';
import { posts } from '../../apis';
import LoaderAwait from '../../components/LoaderAwait';
import { List } from 'antd-mobile';



function Posts({ data }: any) {
  // console.log('Posts len>>>>', data[0]);
  const nav = useNavigate();

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
