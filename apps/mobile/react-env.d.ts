declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
  }
}