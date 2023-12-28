import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Lfj from "../packages/index";

const app = createApp(App);
app.use(Lfj);
app.mount("#app");
