import React, { Suspense } from 'react';
import { useLoaderData, json, LoaderFunctionArgs, defer, Await } from 'react-router-dom';
import { posts } from '../../apis';
import FullLoading from '../../components/FullLoading';
import { LoaderData } from '../../types';
import LoaderAwait from '../../components/LoaderAwait';

async function loader({ request }: LoaderFunctionArgs) {
  try {
    return defer({ data: posts() });
  } catch (error) {
    throw json('博客列表请求失败', { statusText: `Failed api: ${request.url}` });
  }
}


function Component() {
  const loaderData: LoaderData = useLoaderData();
  console.log('loaderData>>>', loaderData.data)
  return (
    <LoaderAwait data={loaderData.data}>
      {(data) => (
        <div className="posts h-full">

          post-content-{data.length}
        </div>
      )}
    </LoaderAwait>
  )
}

Component.displayName = 'Posts';
export { loader, Component }
