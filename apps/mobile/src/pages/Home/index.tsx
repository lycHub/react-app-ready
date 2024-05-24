import React from 'react';
import './style.scoped.scss';
import './style2.scoped.scss';
import { motion } from 'framer-motion';
import { Button, DatePicker, Input, Select, TimePicker, Typography } from 'antd';
import request from '../../utils/request';
import { posts, post } from '../../apis/post';
import { albums } from '../../apis/albums';
import { xmData } from '../../apis/xmly';
import { useMount } from 'ahooks';
import axios from 'axios';

function kebabCaseForPath(path: string) {
  return path.split("/").filter(Boolean).join("-");
}
function Home() {
  function send() {
    Promise.all([
      posts(),
      xmData(),
    ]).then(res => { });
  }

  useMount(() => {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then(res => res.json())
      .then(res => {
        if (import.meta.env.DEV) {
          axios.post("/gen-dts", { [kebabCaseForPath('/api/v2/breeds')]: res });
        }
      })
  });

  return (
    <motion.div
      className='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      <img src="/images/doc.png" alt="doc" width="48" height="48" />
      <div className="btn-group">
        <p className='text-p'>text</p>
        <Button type='primary' onClick={send}>Click</Button>
        <a>link</a>
        <Typography.Link>Alink</Typography.Link>
      </div>
      <div className="form-controls">
        <div className="from-control">
          <Input className="zs-input" bordered={false} allowClear />
        </div>
        <div className="from-control">
          <Input.TextArea className="zs-input" bordered={false} allowClear />
        </div>
        <div className="from-control">
          <Select className="zs-select" style={{ width: '300px' }} mode="multiple" showSearch allowClear optionFilterProp='label' bordered={false} options={[{ label: '撒旦撒', value: 'aa' }]} />

        </div>
        <div className="from-control">
          <DatePicker className='zs-picker' bordered={false} allowClear />

        </div>
        <div className="from-control">
          <TimePicker className='zs-picker' bordered={false} allowClear />
        </div>
      </div>
    </motion.div>
  )
}

Home.displayName = 'Home';
export default Home;