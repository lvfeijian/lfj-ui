<template>
  <div
  class="lv-col"
  :style="style"
  :class="[
    `lv-row-${span}`
  ]">
  <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted ,inject,computed } from 'vue'
import type {Props} from './col.ts'
onMounted(() => {

})
defineOptions({
  name: "LvCol"
});
const props = withDefaults(defineProps<Props>(),{
  span: 24
})
const gutter = inject('gutter')
console.log(gutter, 'gutter');
const style = computed(() => {
  let style = {}
  style.paddingLeft = gutter/2 + 'px'
  style.paddingRight = gutter/2 + 'px'
  return style
})


</script>

<style scoped lang="scss">
@for $i from 1 through 24{
  .lv-row-#{$i}{
    width: calc($i / 24) * 100%;
  }
}
</style>
