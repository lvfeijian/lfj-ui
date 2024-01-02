// https://cn.vuejs.org/guide/reusability/plugins.html
import LvButton from "./src/button.vue";
LvButton.install = (app:any) => {
  // 通过app.component()注册一个全局组件
  app.component(LvButton.name, LvButton);
};
export default LvButton;
