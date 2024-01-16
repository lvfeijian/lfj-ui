import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import {Button,Uploader} from "../packages/index";

const app = createApp(App);
app.use(Button);
app.use(Uploader);
app.mount("#app");
