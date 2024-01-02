import Button from "./button/index.js";
const components = [
  Button
];
const install = function (app: any) {
  components.forEach((component) => {
    app.use(component);
  });
};
/* istanbul ignore if */
if (typeof window !== "undefined" && (window as any).Vue) {
  install((window as any).Vue);
}
export { Button };
export default {
  version: '0.0.4',
  install
};
