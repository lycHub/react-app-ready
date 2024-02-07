# Vite plugin - React单文件插件

**教练，我想写vue**  <img src="https://pic3.zhimg.com/50/v2-cddf31864b4c6fd5cebadb460684dcba_hd.jpg?source=1940ef5c" width="30" />

**ProductCard.react**

```
<script>
   import {Card} from 'antd';
   function ProductCard() {
   return <Card className="product-card">
      product-card
      <span>def text</span>
   </Card>
   }
   export default ProductCard;
</script>

<style>
   .product-card {
   font-weight: bold;
   }
</style>
<style lang="scss">
   @textColor: pink;
   .product-card {
   font-weight: bold;
   color: #f60;
      span {
      color: @textColor;
   }
   }
</style>
<style lang="less">
 @textColor: pink;
.product-card {
  font-weight: bold;
  color: #f60;
   span {
    color: @textColor;
  }
}
</style>
```

## [Demo](https://stackblitz.com/edit/vitejs-vite-2wqebx?file=src%2FApp.react)

## Usage
> npm add react-single-plugin -D

```javascript
// vite.config.js
import react from "@vitejs/plugin-react";
import reactSingle from "react-single-plugin";

export default {
    plugins: [reactSingle()]
  }

  // with options
  export default {
    plugins: [
      // 以下示例是默认值
      reactSingle({
         exclude: "node_modules",
         ext: /\.react$/,
      })
   ]
  }

```

## 临时解决ts检测

1. 新建vite-env.d.ts(与src同级)
```typescript
/// <reference types="vite/client" />
declare module '*.react' {
  import { FC } from 'react';
  export default <P extends Record<string, any>>(props: P) => FC<P>;
}

```

2. 加入tsconfig.json
```json

{
  // ...
  "include": [ "src", "vite-env.d.ts", "react-env.d.ts" ],
  // ...
}
```

tip: 玩具插件切勿当真，npm i下载的就是源码。

vite中实现此功能有些限制，它会先行校验文件后缀，如果真想实现建议直接基于rollup或webpack