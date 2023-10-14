import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { albums } from '../../apis';
import { List } from 'antd-mobile';
import { useMount, useSafeState } from 'ahooks';
import FullLoading from '../../components/FullLoading';

function Albums() {
  // console.log('Albums len>>>>', data[0]);
  const nav = useNavigate();
  const [data, setData] = useSafeState([]);
  useEffect(() => {
    albums().then(res => {
      setData(res);
    });
  }, []);

  return (
    <div className="Albums h-full" style={{ overflowY: 'auto' }}>
      <h3>Albums</h3>
      <div className="album-content h-full relative">
        {
          data.length ? <List>
            {
              data.map(item => <List.Item key={item.id} title={item.title} onClick={() => { nav('/post/' + item.id) }} />)
            }
          </List> : <FullLoading />
        }
      </div>

    </div>
  )
}

function Component() {
  return <Albums />
}


Component.displayName = 'Albums';
export { Component };
