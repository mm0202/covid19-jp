import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}

    interface ElementClass extends Vue {}

    interface IntrinsicElements {
      // @ts-ignore
      [element: string]: any
    }
  }
}

declare namespace NodeJS {
  interface Process {
    browser: boolean
  }
}
