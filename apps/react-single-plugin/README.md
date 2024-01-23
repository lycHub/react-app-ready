# Vite plugin - React单文件插件

类似.vue一样的单文件组件

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

## usage
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

tip: 源码未经过编译，npm i后可按需修改