import React from 'react';
import './style.scss';
import { motion } from 'framer-motion';
import { Button, DatePicker, Input, Select, TimePicker, Typography } from 'antd';
import ProductCard from '../../components/ProductCard.react';
import ProductCardTwo from './ProductCardTwo.react';
function Home() {
  return (
    <motion.div
      className='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      <ProductCard />
      <ProductCardTwo />
      <img src="/images/doc.png" alt="doc" width="48" height="48" />
      <div className="btn-group">
        <p>text</p>
        <Button type='primary'>Click</Button>
        <a>link</a>
        <Typography.Link>Alink</Typography.Link>
      </div>
      <div>
        <div>
          <Input className="zs-input" bordered={false} allowClear />
        </div>
        <div>
          <Input.TextArea className="zs-input" bordered={false} allowClear />
        </div>
        <div>
          <Select className="zs-select" style={{ width: '300px' }} mode="multiple" showSearch allowClear optionFilterProp='label' bordered={false} options={[{ label: '撒旦撒', value: 'aa' }]} />

        </div>
        <div>
          <DatePicker className='zs-picker' bordered={false} allowClear />

        </div>
        <div>
          <TimePicker className='zs-picker' bordered={false} allowClear />

        </div>
      </div>
    </motion.div>
  )
}

Home.displayName = 'Home';
export default Home;