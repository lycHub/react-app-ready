import React, { Suspense, ReactElement } from 'react';
import { MaskBg } from '@app-ready/libs';
import { Await, useLoaderData } from 'react-router-dom';
import { LoaderData } from '../../types';

interface Props {
  children: (data: unknown) => ReactElement;
}
function LoaderAwait({ children }: Props) {
  const loaderData = useLoaderData() as LoaderData;
  // console.log('loaderData>>>', loaderData.data)
  return (
    <Suspense fallback={
      <div className="loader-await h-full relative"><MaskBg className="center" /></div>
    }>
      <Await resolve={loaderData.data}>
        {(event) => children(event)}
      </Await>
    </Suspense>
  )
}

LoaderAwait.displayName = 'LoaderAwait';
export default LoaderAwait;