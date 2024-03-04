import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import {Button,Uploader,Row,Col} from "../packages/index";

const app = createApp(App);
app.use(Button);
app.use(Uploader);
app.use(Row);
app.use(Col);
app.mount("#app");
