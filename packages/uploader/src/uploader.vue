<template>
  <div class="lv-uploader">
    <label class="upload">
      <div class="upload-btn center">+</div>
      <input
        class="upload-input"
        type="file"
        accept="image/*"
        multiple
        ref="fileInput"
        @change="selectFile"
      />
    </label>
    <!-- 预览图片 -->
    <div class="preview" v-for="(item, index) in props.imageList" :key="index">
      <div class="preview-image">
        <img class="img" :src="item" alt="" />
        <i class="iconfont delete center" @click="deleteImage(index)">+</i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, defineExpose, shallowRef } from "vue";
import { Props } from "./uploader";
defineOptions({
  name: "LvUploader"
});
const emit = defineEmits(["update:imageList", "onFileChange", "beforeUpload"]);
type RefArray<T> = Ref<Array<T>>;
const uploadFiles: RefArray<string> = ref([]);
const fileInput = shallowRef<HTMLInputElement>();
const props = withDefaults(defineProps<Props>(), {
  imageList: () => []
});
// 将base64格式的图片转换为Blob类型
const base64ToBlob = (base64: string) => {
  const bytes = window.atob(base64);
  const len = bytes.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = bytes.charCodeAt(i);
  }
  return new Blob([buffer], { type: "image/jpeg" });
};
// 选择本地照片并上传
const selectFile = (event: Event) => {
  try {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    emit("beforeUpload", { files });
    let i = 0;
    Array.from(files).map((file) => {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        i++;
        const blob = base64ToBlob(
          (reader.result as string).replace(/^data:image\/(png|jpeg|svg\+xml);base64,/, "")
        );
        uploadFiles.value.push(window.URL.createObjectURL(blob));
        // 显示预览图片
        emit("update:imageList", uploadFiles.value);
        if (i == files.length) {
          emit("onFileChange", files, uploadFiles.value);
        }
      };
    });

    // 解决文件上传上传同一个文件多次不行
    fileInput.value!.value = ""; // !.非空类型断言
  } catch (error) {
    console.error(error);
    // ({
    //   message: message,
    //   type: "error"
    // });
  }
};
// 点击删除按钮删除图片
const deleteImage = (i: number) => {
  const list = props.imageList;
  list.splice(i, 1);
  emit("update:imageList", list);
};
defineExpose({});
</script>

<style lang="scss" scoped>
.lv-uploader {
  display: flex;
  flex-wrap: wrap;
  .upload {
    position: relative;
    margin: 0 8px 8px 0;

    &-btn {
      width: 80px;
      height: 80px;
      font-size: 40px;
      border: 1px dashed #e5e5e5;
      cursor: pointer;
      display: inline-flex;
      border-radius: 4px;
      box-sizing: border-box;
      color: #969799;
    }
    &-input {
      display: none;
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
      left: 0;
      top: 0;
    }
  }
  .preview {
    position: relative;
    margin: 0 8px 8px 0;
    &-image {
      overflow: hidden;
      border-radius: 4px;
      width: 80px;
      height: 80px;

      .img {
        object-fit: cover;
        display: block;
        width: 100%;
        height: 100%;
        overflow-clip-margin: content-box;
        overflow: clip;
      }
      .delete {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        position: absolute;
        transform: rotate(45deg);
        background-color: #969799;
        top: -8px;
        right: -8px;
        color: #fff;
        font-size: 18px;
        border-radius: 100%;
      }
    }
  }
}
</style>
