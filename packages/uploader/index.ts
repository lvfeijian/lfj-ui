// https://cn.vuejs.org/guide/reusability/plugins.html
import LvUploader from "./src/uploader.vue";
LvUploader.install = (app:any) => {
  // 通过app.component()注册一个全局组件
  app.component(LvUploader.name, LvUploader);
};
export default LvUploader;
