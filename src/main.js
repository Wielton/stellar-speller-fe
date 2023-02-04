import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";



// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import '@mdi/font/css/materialdesignicons.css'
import "./assets/main.css";
// Vue Cookies

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi'
  }
});


const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
