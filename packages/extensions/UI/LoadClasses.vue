<template>
  <div
    :class="[
      $style.display_none,
      $style.pcc1,
      $style.fc1,
      $style.pcc2,
      $style.fc2,
      $style.pcc3,
      $style.fc3,
      $style.pcc4,
      $style.fc4,
      $style.pcc5,
      $style.fc5,
      $style.pcc6,
      $style.fc6,
      $style.root,
      $style.child0
    ]"
  />
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" module>
@import 'Atoms/CountBox/CountBox';

.display_none {
  display: none !important;
}
</style>
