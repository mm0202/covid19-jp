<template>
  <v-autocomplete
    v-model="selects"
    :disabled="!isEnabled"
    :items="options"
    filled
    chips
    :label="title"
    item-text="name"
    item-value="value"
    multiple
    @blur="blur"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item" />
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name" />
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    isEnabled: {
      type: Boolean,
      default: true
    },
    initialSelects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return { selects: this.initialSelects }
  },
  methods: {
    remove(item) {
      const selects = _.cloneDeep(this.selects)
      const index = selects.indexOf(item.value ? item.value : item.name)
      if (index >= 0) selects.splice(index, 1)

      this.selects = selects
    },
    blur() {
      this.$emit('watchSelects', this.selects)
    }
  }
}
</script>
