import Vue from "vue";
import App from './app.vue';

import './assets/images/1.jpeg';
import "./assets/css/app.css"

const root = document.createElement("div");
document.body.appendChild(root);

const app = new Vue({
    render: (h) => h(App)
});

app.$mount();