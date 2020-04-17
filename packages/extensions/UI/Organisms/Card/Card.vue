<template>
  <v-col cols="12" :md="md" class="DataCard">
    <data-view :title="title" :title-id="titleId" :date="date" :url="url">
      <template v-slot:button>
        <p :class="$style.note">
          {{ description }}
        </p>
      </template>
      <slot />
    </data-view>
  </v-col>
</template>

<style lang="scss" module>
@import 'assets/variables';
@import 'assets/global';

.note {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 12px;
  color: $gray-3;
}
</style>

<script lang="ts">
import Vue from 'vue'
import DataView from '@/components/DataView.vue'

export default Vue.extend({
  components: { DataView },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    md: {
      type: Number,
      default: 6
    }
  }
})
</script>
