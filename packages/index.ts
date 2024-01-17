import Button from "./button/index.js";
import Uploader from "./uploader/index.js";
const components = [
  Button,
  Uploader
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
export { Button, Uploader };
export default {
  version: '0.0.5',
  install
};
