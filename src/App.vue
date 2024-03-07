<template>
  <div>
    <LvButton type="primary">123</LvButton>
    <LvButton>123</LvButton>
    <LvUploader></LvUploader>
    <div>
      <LvRow :gutter="20">
        <LvCol :span="12">
          <div class="a">1111</div>
        </LvCol>
        <LvCol :span="12">
          <div class="a">2222</div>
        </LvCol>
      </LvRow>
    </div>
    <div v-for="fit in fits" >
      <LvImage @error="error" style="width: 100px; height: 100px" :src="url" :fit="fit">
        <template v-slot:placeholder>
          <div class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </template>
        <template v-slot:error>
          <div class="image-slot">
            加载失败<span class="dot">...</span>
          </div>
        </template>
      </LvImage>
    </div>
    <div class="lazy">
      <LvImage v-for="url in urls" :src="url" :key="url" lazy></LvImage>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
const fits = ref(['fill', 'contain', 'cover', 'none', 'scale-down'])
const urls = ref([
'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
])
function error(e:Event){
  console.log(e,'error');

}
</script>

<style scoped>
.a {
  height: 40px;
  background: #d3dce6;
}
.lazy{
  height: 400px;
  overflow-y: scroll;
}
</style>
