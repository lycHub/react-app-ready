import React, { Suspense, ReactElement } from 'react'
import { Mask, MaskProps, SpinLoading } from 'antd-mobile';
import FullLoading from '../FullLoading';
import { Await, useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';

interface Props {
  children: (data: any) => ReactElement;
}
function LoaderAwait({ children }: Props) {
  const loaderData = useLoaderData() as LoaderData;
  // console.log('loaderData>>>', loaderData.data)
  return (
    <Suspense fallback={
      <div className="loader-await h-full relative"><FullLoading /></div>
    }>
      <Await resolve={loaderData.data}>
        {(event) => children(event)}
      </Await>
    </Suspense>
  )
}

LoaderAwait.displayName = 'LoaderAwait';
export default LoaderAwait;