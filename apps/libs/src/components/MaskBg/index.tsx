import React, { PropsWithChildren } from 'react'
import { CommonProps } from '@app-ready/libs';
import './index.css';
import { Spin } from 'antd';

function MaskBg({ className, children }: PropsWithChildren<Record<string, unknown> & CommonProps>) {
  return (
    <div className={`mask-bg ${className}`}>{children || <Spin size='large' />}</div>
  )
}

MaskBg.displayName = 'MaskBg';
export { MaskBg };