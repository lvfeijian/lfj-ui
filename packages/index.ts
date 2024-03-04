import Button from "./button/index.js";
import Uploader from "./uploader/index.js";
import Row from "./row/index.js";
import Col from "./col/index.js";
const components = [
  Button,
  Uploader,
  Row,
  Col
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
export { Button, Uploader, Row,Col };
export default {
  version: '0.0.5',
  install
};
