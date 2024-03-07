import image from "./src/image.vue";
image.install = (app: any) => {
  // 通过app.component()注册一个全局组件
  app.component(image.name, image);
};
export default image;
