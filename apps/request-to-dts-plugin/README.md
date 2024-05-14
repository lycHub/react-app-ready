# Vite plugin - React Scoped Css

**Move [Vue scoped css](https://cn.vuejs.org/api/sfc-css-features.html#scoped-css) to react**

## Usage
> npm add vite-plugin-react-scope-css -D


vite.config.js:
```javascript
import reactScopedCss from "vite-plugin-react-scope-css";

export default {
    //...
    plugins: [reactScopedCss(), react()],
   //...
  };


   // with options
  export default {
    plugins: [
      // The example options is default value, The css filename with end of '.scoped.css' will be scoped, eg: test.scoped.css
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
