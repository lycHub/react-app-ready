import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MaskBg } from '@app-ready/libs';
import { List } from 'antd-mobile';
import { albums } from '../../apis';
import { useMount, useRequest, useSafeState } from 'ahooks';
import ErrorPage from '../Error';

function Albums() {
  // console.log('Albums len>>>>', data[0]);
  const nav = useNavigate();
  const [title, setTitle] = useSafeState('Albums');
  const { data, run, loading, error } = useRequest(albums, {
    manual: true
  });
  useMount(() => {
    run();
  });

  if (loading) {
    return <MaskBg className="center" />
  }

  if (error) {
    return <ErrorPage errorInfo={error} />
  }

  return (
    <div className="Albums h-full" style={{ overflowY: 'auto' }}>
      <h3 onClick={() => { setTitle('useRequest不会重新请求') }}>{title}</h3>
      <div className="album-content h-full relative">
        <List>
          {
            data?.map(item => <List.Item key={item.id} title={item.title} onClick={() => { nav('/post/' + item.id) }} />)
          }
        </List>
      </div>

    </div>
  )
}

function Component() {
  return <Albums />
}


Component.displayName = 'Albums';
export { Component };
