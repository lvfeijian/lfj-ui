<template>
  <div class="lv-row flex" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,provide, computed } from 'vue';
import type { Props } from "./row.ts"
defineOptions({
  name: "LvRow"
})
const props = withDefaults(defineProps<Props>(),{
  gutter: 0
})
provide('gutter',props.gutter)
const style = computed(() => {
  let style = {}
  if(props.gutter){
    style.marginLeft = -props.gutter/2 + 'px'
    style.marginRight = style.marginLeft
  }
  return style
})
</script>

<style scoped lang="scss">
.lv-row{
  // width: 100%;
}
</style>
