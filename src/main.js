import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./scss/style.scss";
import select2 from "select2";
window.$ = window.jQuery = require("jquery");

Vue.filter('toCurrency', function (value) {
	if (isNaN(value)) return value;
	let val = (value / 1).toFixed(2);
	return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App)
}).$mount("#app");