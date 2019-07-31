<template>
	<div class="result">
		<template v-if="order.id">
			<div class="heading">Thank you for your order!</div>
			<div class="mb-10 bold">Order number is: {{ order.id }}</div>
			<div class="mb-20">Your will recieve an email confirmation shortly to {{ order.email }}</div>
			<div class="mb-20">
				Estimated delivery Day is
				<span class="bold">{{ order.deliveryDate }}</span>
			</div>
			<a href="#" class="result__print hide-on-print" @click.prevent="print">Print Recipe</a>
		</template>
		<template v-else>
			<div>Checkout error</div>
		</template>
	</div>
</template>

<script>
export default {
	name: "Result",
	props: {
		order: {
			type: Object
		}
	},
	methods: {
		print() {
			window.print();
		}
	}
};
</script>

<style lang="scss" scoped>
	@import "../scss/rem";
	@import "../scss/variables";
	.result {
		padding: 38px 0;
		color: $black;
		&__print {
			color: $accent;
			font-size: rem(13px);
			font-weight: 500;
		}
	}
</style>
