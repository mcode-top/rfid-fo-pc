import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/style/theme.scss";
import ElementPlus from "element-plus";
import "normalize.css";
import { createPinia } from "pinia";
import { router } from "./routes";
const app = createApp(App).use(ElementPlus).use(createPinia()).use(router);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
