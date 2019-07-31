<template>
	<div id="app">
		<header class="header hide-on-print">
			<div class="header__inner">
				<div class="header__heading">Front-end Developer Test Task</div>
				<div class="header__cart">
					cart
					<span v-if="productsCount" class="header__cart-count">{{productsCount}}</span>
				</div>
			</div>
		</header>

		<section class="order">
			<div class="registration">
				<nav v-if="steps.indexOf(currentComponent) >= 0" class="registration__nav">
					<ul class="registration__nav-list">
						<li v-for="step in steps" :key="step" class="registration__nav-item">
							<a
								class="registration__nav-link"
								:class="{'registration__nav-link_active': currentComponent == step}"
								href="#"
								@click.prevent="changeStep(step)"
							>{{ step }}</a>
						</li>
					</ul>
				</nav>
				<component :is="currentComponent" :order="Object.keys(order).length ? order : false"></component>
			</div>
			<Summary :class="{ summary_result: currentComponent == 'Result' }"></Summary>
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
	components: {
		Shipping,
		Billing,
		Payment,
		Result,
		Summary
	},
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
	created() {
		this.$store.commit("setCountries", countries);
		this.$store.commit("setProducts", products);
		this.$on("nextStep", function() {
			let next = this.steps.indexOf(this.currentComponent) + 1;
			if (next && next < this.steps.length) {
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
			};
			this.currentComponent = "Result";
		});
	},
	methods: {
		changeStep(step) {
			if (
				this.steps.indexOf(this.currentComponent) >
				this.steps.indexOf(step)
			) {
				this.currentComponent = step;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "./scss/rem";
@import "./scss/variables";
.header {
	background-color: $white;
	border-bottom: 1px solid #f6b8de;
	color: $accent;
	font-size: rem(15px);
	font-weight: 300;
	margin-bottom: 45px;
	&__inner {
		display: flex;
		display: flex;
		width: 100%;
		max-width: 700px;
		box-sizing: border-box;
		margin: 0 auto;
		align-items: baseline;
		justify-content: space-between;
		padding: 14px 0px;
		@media screen and (max-width: 767px) {
			padding: 15px;
		}
	}
	&__heading {
		font-size: rem(18px);
		display: flex;
		padding-left: 38px;
		position: relative;
		&::before {
			content: "";
			background: url(./images/svg/logo.svg) no-repeat;
			position: absolute;
			left: 0;
			top: -4px;
			width: 26px;
			height: 26px;
		}
		@media screen and (max-width: 767px) {
			font-size: rem(12px);
			&::before {
				top: -6px;
			}
		}
	}
	&__cart {
		color: #c90ea5;
		display: flex;
		position: relative;
		padding-right: 35px;
		&::after {
			content: "";
			width: 21px;
			height: 16px;
			background: url(./images/svg/cart.svg) no-repeat;
			position: absolute;
			top: 0;
			right: 10px;
		}
		&-count {
			position: absolute;
			top: -7px;
			right: 0;
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background-color: #ff1876;
			color: $white;
			font-size: 9px;
			font-weight: 500;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

.order {
	display: flex;
	background-color: $white;
	width: 100%;
	max-width: 700px;
	box-sizing: border-box;
	box-shadow: 0 2px 18px rgba(0, 0, 0, 0.07);
	border-radius: 5px;
	margin: 0 auto;
	overflow: hidden;
	@media screen and (max-width: 767px) {
		flex-direction: column;
	}
	@media print {
		box-shadow: none;
	}
}

.registration {
	padding: 24px 40px 44px;
	width: 57%;
	box-sizing: border-box;
	&__nav {
		font-size: rem(12px);
		margin-bottom: 24px;
		&-list {
			list-style: none;
			display: flex;
			margin: 0;
			padding: 0;
			> :not(:last-child)::after {
				content: "";
				width: 13px;
				height: 13px;
				border-right: 1px solid #e0e0e0;
				border-bottom: 1px solid #e0e0e0;
				display: flex;
				transform: rotate(-45deg);
				box-sizing: border-box;
			}
			> :first-child .registration__nav-link {
				margin-left: 0;
			}
		}
		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&-link {
			text-decoration: none;
			opacity: 0.8;
			color: #979797;
			display: flex;
			margin-right: 7px;
			margin-left: 18px;
			&_active {
				color: $accent;
			}
		}
	}
	@media screen and (max-width: 767px) {
		width: 100%;
		padding: 25px 15px;
	}
}
</style>
