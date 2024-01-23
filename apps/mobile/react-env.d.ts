/// <reference types="vite/client" />
declare module '*.react' {
  import { FC } from 'react';
  export default <P extends Record<string, any>>(props: P) => FC<P>;
}
