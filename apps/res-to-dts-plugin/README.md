# Vite plugin - Res to dts

**Auto gen typescript definition file according to response by [quicktype](https://app.quicktype.io/)**

> tip: the plugin only execute on vite server


## [Demo](https://stackblitz.com/edit/vitejs-vite-bfnk6t?file=index.html)

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
        // Storage path, relative to the current root directory
        outputDir: "/quick-types",

        // The node routing that the client needs to call
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

post request [routePath] designated route，Pass in the response as a parameter. It is recommended to call it in the interceptor，eg for axios: 

```javascript
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

request.interceptors.response.use((response) => {
  const { status, data } = response;
  if (status === 200) {
     if (import.meta.env.DEV) {
      /* 
        Afferent {key: value}，key suggests ensuring uniqueness, so as not to generate duplicates dts file,
        The following example is converting the URL to a kabab case as the key, eg： /api/article/1 => api-article-1，
        and 'api-article-1' as file name to generate 'api-article-1.ts'
      */
      axios.post("/gen-dts", { [kebabCase(config.url as string)]: data });
    }
    return response;
  }
  return Promise.reject('error');
}, error => Promise.reject('error'));

```

## npm i peerDependencies error: "unable to resolve dependency tree"

请加入以下配置即可：
```json
{
  "overrides": {
    "vite-plugin-res-to-dts": {
      "vite": "$vite"
    }
  }
}
```