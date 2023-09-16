import React, { Suspense, ReactElement } from 'react'
import { Mask, MaskProps, SpinLoading } from 'antd-mobile';
import FullLoading from '../FullLoading';
import { Await } from 'react-router-dom';
import { LoaderData } from '../../types';

interface Props {
  data: Promise<any>;
  children: (data: any) => ReactElement;
}
function LoaderAwait({ data, children }: Props) {
  return (
    <div className="loader-await h-full relative">
      <Suspense fallback={<FullLoading />}>
        <Await resolve={data}>
          {(event) => children(event)}
        </Await>
      </Suspense>
    </div>
  )
}

LoaderAwait.displayName = 'LoaderAwait';
export default LoaderAwait;