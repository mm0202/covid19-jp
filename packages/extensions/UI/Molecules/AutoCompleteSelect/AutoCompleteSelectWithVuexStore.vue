<template>
  <AutoCompleteSelect
    :options="options"
    :field="field"
    :title="title"
    :initial-selects="initialSelects"
    @watchSelects="watchSelects"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AutoCompleteSelect from './AutoCompleteSelect.vue'

export default {
  components: { AutoCompleteSelect },
  props: {
    options: {
      type: Array,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('select', ['selects']),
    initialSelects() {
      return this.selects[this.field]
    }
  },
  methods: {
    ...mapMutations('select', ['updateSelects']),
    watchSelects(val) {
      this.updateSelects({ field: this.field, selects: val })
    }
  }
}
</script>
