// web-component dts
declare global {
  interface HTMLElementTagNameMap {
    "iconify-icon": IconifyElement;
  }
}

interface IconifyElement extends HTMLElement {
  icon: string;
}
