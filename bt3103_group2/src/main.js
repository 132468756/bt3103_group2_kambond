import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(fas);

const app = createApp(App);

app.use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
