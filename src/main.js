import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { VueMaskDirective } from 'v-mask';
Vue.directive('mask', VueMaskDirective);
import "./scss/style.scss";

Vue.filter("toCurrency", function(value) {
	if (isNaN(value)) return value;
	let val = (value / 1).toFixed(2);
	return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App)
}).$mount("#app");
