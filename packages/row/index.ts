import row from "./src/row.vue";
row.install = (app: any) => {
  // 通过app.component()注册一个全局组件
  app.component(row.name, row);
};
export default row;
