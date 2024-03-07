<template>
  <div ref="container" class="lv-image">
    <slot v-if="loading" name="placeholder">
      <div class="lv-image__placeholder"></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="lv-image__error"></div>
    </slot>
    <img v-else :src="props.src" :style="imageStyle" class="lv-image__inner">
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { fitTypes } from "./image"
defineOptions({
  name: "LvImage",
  // inheritAttrs: false
});

const props = defineProps({
  src: {
    type: String,
    require: true,
  },
  fit: {
    type: String,
    validator: (val) => fitTypes.includes(val),
  },
  lazy: {
    type:Boolean
  }
})

const emit = defineEmits(['error'])

const loading = ref(true)
const error = ref(false)
const container = ref<HTMLElement>()
const imageWidth = ref(0)
const imageHeight = ref(0)
const show = !props.lazy
const imageStyle = computed(() => {
  if (props.fit) {
    return {
      "object-fit": props.fit
    }
  }
  return {}
})
onMounted(() => {
  if(props.lazy){
    addLazyLoadListener()
  } else {
    loadImage()
  }
})

function loadImage() {
  loading.value = true
  error.value = false
  const img = new Image()
  img.onload = e => handleLoad(e, img)
  img.onerror = handleError
  img.src = props.src

}

function handleLoad(e, img) {
  imageWidth.value = img.width
  imageHeight.value = img.height
  loading.value = false
  error.value = false

}
function handleError(e) {
  loading.value = false
  error.value = true
  emit('error', e)
}
function addLazyLoadListener(){
  let _scrollContainer = null
  _scrollContainer = findScrollParent(container.value)
}
function findScrollParent(element) {
  if (!element) return null;

  const overflow = window.getComputedStyle(element).overflow;
  console.log(overflow.y,'overflow');

  if (overflow === 'scroll' || overflow === 'auto' || overflow === 'auto scroll') return element;
  return findScrollParent(element.parentNode);
}
</script>

<style scoped lang="scss">
.lv-image {
  &__placeholder{
    background: #f5f7fa;
  }
  &__inner,&__placeholder{
    width: 100%;
    height: 100%;
  }
}
</style>
