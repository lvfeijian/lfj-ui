<template>
  <div>
    <LvButton type="primary" >123</LvButton>
    <LvButton>123</LvButton>
    <LvUploader></LvUploader>
    <LvRow :gutter="20">
      <LvCol :span="12">
        <div class="a">1111</div>
      </LvCol>
      <LvCol :span="12">
        <div class="a">2222</div>
      </LvCol>
    </LvRow>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.a{
  height: 40px;
  background: #d3dce6;
}
</style>
