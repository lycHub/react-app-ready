import React from 'react'
import { Mask, MaskProps, SpinLoading } from 'antd-mobile';
import './index.scss';

function FullLoading(props: MaskProps) {
  return (
    <Mask
      className='full-loading center'
      color='rgb(var(--zs-grey-1-rgb) / 50%)'
      {...props}
    >
      <div className="child"><SpinLoading className='loading' color='primary' /></div>
    </Mask>
  )
}

FullLoading.displayName = 'FullLoading';
export default FullLoading;