import Vue from "vue";
import App from './app.vue';

const root = document.createElement("div");
document.body.appendChild(root);

const app = new Vue({
    render: (h) => h(App)
});

app.$mount();