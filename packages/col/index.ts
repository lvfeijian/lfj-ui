import col from "./src/col.vue";
col.install = (app: any) => {
  // 通过app.component()注册一个全局组件
  app.component(col.name, col);
};
export default col;
