# Vite plugin - React单文件插件

类似.vue一样的单文件组件eg:

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

tip: 源码未经过编译，npm i后可按需修改