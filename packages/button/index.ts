import LvButton from "./src/button.vue";
LvButton.install = (app:any) => {
  app.use(LvButton.name, LvButton);
};
export default LvButton;
