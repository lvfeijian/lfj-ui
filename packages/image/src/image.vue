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
import { ref, reactive, onMounted, computed, shallowRef,watch } from 'vue'
import { fitTypes } from "./image"
import { throttle } from "lodash-es"
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
const show = ref(!props.lazy)
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

  img.onload = (e) => handleLoad(e, img)
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
let scrollContainer = shallowRef()
let _lazyLoadHandler = shallowRef()
function addLazyLoadListener(){
  let _scrollContainer:HTMLElement|null = null
  _scrollContainer = findScrollContainer(container.value)
  if(_scrollContainer){
    scrollContainer.value = _scrollContainer
    _lazyLoadHandler.value = throttle(handleLazyLoad,200)
  }
  _scrollContainer.addEventListener('scroll',_lazyLoadHandler.value)
  handleLazyLoad()

}
function removeLazyLoadListener(){
  // if(scrollContainer.value && _lazyLoadHandler.value){
    scrollContainer.value.removeEventListener('scroll',_lazyLoadHandler.value)
    scrollContainer.value = null
    _lazyLoadHandler.value = null
  // }
}
// 递归找当前元素的外层父元素中第一个overflow-y值为scroll的元素
function findScrollContainer(element) {
  if (!element) return null;

  const overflow = window.getComputedStyle(element);
  const overflowY = overflow.getPropertyValue("overflow-y")

  if (overflowY === 'scroll') return element;
  return findScrollContainer(element.parentNode);
}
function handleLazyLoad(){
  console.log(isInContainer(container.value,scrollContainer.value));

  if(isInContainer(container.value,scrollContainer.value)){
    loadImage()
    removeLazyLoadListener()
  }

}
 const isInContainer = (el, container) => {
  if (!el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }
  console.log(elRect,containerRect);

  return elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right;
};
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
