# Vite plugin - Res to dts

**Auto gen typescript definition file according to response by [quicktype](https://app.quicktype.io/)**

## Usage
> npm add vite-plugin-res-to-dts -D


vite.config.js:
```javascript
import resToDts from "vite-plugin-res-to-dts";
export default {
    //...
    plugins: [resToDts()],
   //...
  };


   // with options
  export default {
    plugins: [
       resToDts({
        // 存放路径，相对当前根目录
        outputDir: "/quick-types",

        // 客户端需要调用的接口路由
        routePath: "/gen-dts",

        /* 
          By default, the same type declaration file will not be generated repeatedly based on a unique key,
Setting it to true will change this behavior
        */
        cover: false,
      }),
   ]
  }
```

post请求[routePath]指定的路由，将response作为参数传入，推荐在拦截器中调用，已axios为例

```javascript
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

request.interceptors.response.use((response) => {
  const { status, data } = response;
  if (status === 200) {
     if (import.meta.env.DEV) {
      /* 
        传入 {key: value}形式，key建议保证唯一，这样就不会重复生成dts file,
        下面的示例是将url转成了kabab case作为key, 比如： /api/article/1 => api-article-1
        并将 'api-article-1' 作为文件名生成 'api-article-1.ts'
      */
      axios.post("/gen-dts", { [kebabCase(config.url as string)]: data });
    }
    return response;
  }
  return Promise.reject('error');
}, error => Promise.reject('error'));

```

## [Demo](https://stackblitz.com/edit/vitejs-vite-nc4lb2?file=src%2FApp.tsx)
