import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'

const Props = Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    }
  }
})

@Component
export class Hello extends Props {
  render(): VNode {
    return (
      <div>
        Hello, {this.name} {this.$slots.default}
      </div>
    )
  }
}

@Component
export class App extends Vue {
  render(): VNode {
    return (
      <div>
        <Hello name="nju33">!!!!!</Hello>
      </div>
    )
  }
}
