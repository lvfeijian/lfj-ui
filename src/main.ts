import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import lfj from "../packages/index";

const app = createApp(App);
app.use(lfj);
app.mount("#app");
