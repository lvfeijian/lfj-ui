import Button from "./button/index.js";
const components = [Button];
const install = function (app: any) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
/* istanbul ignore if */
if (typeof window !== "undefined" && (window as any).Vue) {
  install((window as any).Vue);
}
export { Button };
export default {
  install
};
