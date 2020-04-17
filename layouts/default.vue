<template>
  <Default />
</template>

<script lang="ts">
import Vue from 'vue'
import Default from '~/packages/components/Templates/Default.vue'

export default Vue.extend({
  components: {
    Default
  },
  beforeMount() {
    if (process.env.NODE_ENV === 'production') {
      if (location.protocol === 'http:') {
        location.href = location.href.replace(/^http:(.*)$/, 'https:$1')
      }
    }
  }
})
</script>
