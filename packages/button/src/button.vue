<template>
  <!-- scss颜色函数 background: lighten -->
  <button
    class="lfj-button center"
    :disabled="disabled"
    :type="nativeType"
    :class="[
      `lfj-button--${props.type}`,
      `lfj-button--${props.size}`,
      { 'is-plain': plain },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { buttonTypes, buttonSizes } from "./button";
defineOptions({
  name: "LvButton"
});
const props = defineProps({
  type: {
    type: String,
    validator: (val: string) => buttonTypes.includes(val),
    default: "default"
  },
  size:{
    type: String,
    validator: (val: string) => buttonSizes.includes(val),
    default: 'default'
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
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 24px;
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
// @each $type,
//   $color in (small,large)
// {
//   .lfj-button--#{$type} {
//     $color: $color;

//     background: $color;
//     color: #fff;
//     &:hover {
//       background: lighten($color, 10%); // 颜色变淡百分之几
//     }
//     // 按钮点击时
//     &:active {
//       background: darken($color, 10%); // 颜色变深百分之几
//     }
//     // 按钮被禁用
//     &:disabled {
//       background: lighten($color, 20%);
//       cursor: not-allowed;
//     }
//   }
// }
</style>
