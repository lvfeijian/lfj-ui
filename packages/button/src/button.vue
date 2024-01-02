<template>
  <!-- scss颜色函数 background: lighten -->
  <button
    class="lfj-button center"
    :disabled="disabled"
    :type="nativeType"
    :class="[
      `lfj-button--${props.type}`,
      { 'is-plain': plain }
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { buttonTypes } from "../src/button";
defineOptions({
  name: "LvButton"
});
const props = defineProps({
  type: {
    type: String,
    validator: (val: string) => buttonTypes.includes(val),
    default: "default"
  },
  nativeType: {
    type: String,
    default: "button"
  },
  disabled: Boolean
});
</script>

<style scoped lang="scss">
.lfj-button {
  width: 88px;
  height: 32px;
  font-size: 16px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
}
// @each 指令的格式是 $var in <list>
@each $type,
  $color in (primary: #409eff, success: #67c23a, warning: #909399, danger: #e6a23c, info: #f56c6c,fy-primary:#8B7A9B)
{
  .lfj-button--#{$type} {
    $color: $color;

    background: $color;
    color: #fff;
    &:hover {
      background: lighten($color, 10%); // 颜色变淡百分之几
    }
    // 按钮点击时
    &:active {
      background: darken($color, 10%); // 颜色变深百分之几
    }
    // 按钮被禁用
    &:disabled {
      background: lighten($color, 20%);
      cursor: not-allowed;
    }
  }
}
</style>
