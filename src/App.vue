<template>
	<div id="app">
		<header class="header hide-on-print">
			<div class="header__inner">
				<div class="header__heading">Front-end Developer Test Task</div>
				<div class="header__cart">
					cart
					<span class="header__cart-count" v-if="productsCount">{{productsCount}}</span>
				</div>
			</div>
		</header>

		<section class="order">
			<div class="registration">
				<nav class="registration__nav" v-if="steps.indexOf(currentComponent) >= 0">
					<ul class="registration__nav-list">
						<li class="registration__nav-item" v-for="step in steps" :key="step">
							<a
								class="registration__nav-link"
								:class="{'registration__nav-link_active': currentComponent == step}"
								href="#"
								@click.prevent="changeStep(step)"
							>{{step}}</a>
						</li>
					</ul>
				</nav>
				<component :is="currentComponent" :order="order"></component>
			</div>
			<Summary :class="{'summary_result': currentComponent == 'Result'}"></Summary>
		</section>
	</div>
</template>

<script>
import Shipping from "@/components/Shipping.vue";
import Billing from "@/components/Billing.vue";
import Payment from "@/components/Payment.vue";
import Result from "@/components/Result.vue";
import Summary from "@/components/Summary.vue";
import countries from "@/country.json";
import products from "@/products.json";
export default {
	name: "App",
	data() {
		return {
			steps: ["Shipping", "Billing", "Payment"],
			currentComponent: "Shipping",
			order: {}
		};
	},
	computed: {
		productsCount() {
			return this.$store.state.products.length;
		}
	},
	methods: {
		changeStep(step) {
			if( this.steps.indexOf(this.currentComponent) > this.steps.indexOf(step) ) {
				this.currentComponent = step;
			}
		}
	},
	components: {
		Shipping,
		Billing,
		Payment,
		Result,
		Summary
	},
	created() {
		this.$store.commit("setCountries", countries);
		this.$store.commit("setProducts", products);
		this.$on("nextStep", function() {
			let next = this.steps.indexOf(this.currentComponent) + 1;
			if(next && next < this.steps.length) {
				this.currentComponent = this.steps[next];
			}
		});
		this.$on("makeOrder", function() {
			// make order (axios.post)
			// return oder information
			this.order = {
				id: "188787788",
				email: "jonathan.smith@gmail.com",
				deliveryDate: "Friday 1st April 2016"
			}
			this.currentComponent = "Result";
		});
	}
};
</script>

<style lang="scss">
</style>
