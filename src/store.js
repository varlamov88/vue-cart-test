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
		canUseLocation: false,
		countries: [],
		geoUrl: "https://geocode-maps.yandex.ru/1.x/?apikey=0990cb3d-336b-4255-a25b-76d0ace1a51f&format=json&kind=house&lang=en_US&geocode="
	},
	mutations: {
		setProducts(state, arr) {
			state.products = arr;
		},
		setUser(state, { key, value }) {
			state.user[key] = value;
		},
		setCanUseLocation(state, bool) {
			state.canUseLocation = bool;
		},
		setCountries(state, arr) {
			state.countries = arr;
		}
	},
	actions: {}
});
