import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		products: [],
		user: {
			shipping: {},
			billing: {},
			payment: {},
			location: {}
		},
		countries: {

		}
	},
	mutations: {
		setProducts(state, arr) {
			state.products = arr;
		},
		setUser(state, { key, value }) {
			state.user[key] = value;
		},
		setCountries(state, obj) {
			state.countries = obj;
		}
	},
	actions: {}
});
