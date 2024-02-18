import React from 'react';
import './style.scoped.scss';
import './style2.scoped.scss';
import { motion } from 'framer-motion';
import { Button, DatePicker, Input, Select, TimePicker, Typography } from 'antd';
function Home() {
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
        <Button type='primary'>Click</Button>
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