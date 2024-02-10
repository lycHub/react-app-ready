# Vite plugin - React Scoped Css

**移植 [Vue scoped css](https://cn.vuejs.org/api/sfc-css-features.html#scoped-css) 到react**

## Usage
> npm add react-scope-css-plugin -D


vite.config.js:
```javascript
import reactScopedCss from "react-scope-css-plugin";

export default {
    //...
    plugins: [reactScopedCss(), react()],
   //...
  };


   // with options
  export default {
    plugins: [
      // 以下示例是默认值
      reactScopedCss({
         include: /\.[jt]sx$/,
         cssReg: /\.scoped\.(le|sa|sc|c)ss$/,
      })
   ]
  }
```

## [Demo](https://stackblitz.com/edit/vitejs-vite-nc4lb2?file=src%2FApp.tsx)

### Related Package
[@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)