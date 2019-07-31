<template>
	<div class="summary">
		<div class="summary__top row">
			<div class="sub-heading col">Order summary</div>
			<a class="col col-auto summary__edit hide-on-print" href="#" @click.prevent="editOrder">edit order</a>
		</div>
		<template v-if="products.length">
			<div class="products">
				<div v-for="product in products" :key="product.id" class="products__item">
					<div class="row">
						<div class="col col-auto">
							<div class="products__image">
								<img v-if="product.img" class="products__img" :src="product.img" :alt="product.name" />
							</div>
						</div>
						<div class="products__info col">
							<div class="products__name">{{ product.name }}</div>
							<div class="products__variant">{{ product.variant }}</div>
							<div class="products__quantity">Quantity: {{ product.quantity }}</div>
						</div>
						<div class="products__price col col-auto">{{ product.price | toCurrency }}</div>
					</div>
				</div>
			</div>
			<div class="summary__info">
				<div class="summary__info-item row">
					<div class="summary__info-text col">Subtotal</div>
					<div class="summary__info-value col col-auto">{{ subtotal | toCurrency }}</div>
				</div>
				<div class="summary__info-item row">
					<div class="summary__info-text col">Shipping</div>
					<div class="summary__info-value col col-auto">{{ shipping ? shipping : "Free" | toCurrency }}</div>
				</div>
				<div class="summary__info-item row">
					<div class="summary__info-text col">Taxes</div>
					<div class="summary__info-value col col-auto">{{ taxes | toCurrency }}</div>
				</div>
			</div>
			<div class="summary__total row">
				<div class="summary__total-text col">Total</div>
				<div class="summary__total-value col col-auto">{{ total | toCurrency }}</div>
			</div>
		</template>
		<template v-else>
			<div>Cart is empty</div>
		</template>
		<div class="summary__bottom">All purchases are subject to our Terms and Conditions.</div>
	</div>
</template>

<script>
export default {
	name: "Summary",
	computed: {
		products() {
			return this.$store.state.products;
		},
		subtotal() {
			let v = 0;
			this.products.forEach(element => {
				v += element.price;
			});
			return v;
		},
		shipping() {
			let v = 0;
			// вычисления
			return v;
		},
		taxes() {
			let v = 12.12;
			// вычисления
			return v;
		},
		total() {
			return this.subtotal + this.shipping + this.taxes;
		}
	},
	methods: {
		editOrder() {
			alert("Заглушка");
		}
	}
};
</script>

<style lang="scss" scoped>
	@import "../scss/rem";
	@import "../scss/variables";
	.summary {
		width: 43%;
		background-color: #f2f4f7;
		padding: 25px 10px 14px;
		box-sizing: border-box;
		font-size: rem(12px);
		display: flex;
		flex-direction: column;
		&_result {
			opacity: 0.5;
		}
		&__top {
			justify-content: space-between;
		}
		&__edit {
			color: #979797;
		}
		&__info {
			border-bottom: 1px solid #e3e3e3;
			padding: 10px 0 0;
			&-item {
				margin-bottom: 6px;
			}
		}
		&__total {
			color: $accent;
			font-weight: 700;
			padding: 15px 0;
		}
		&__bottom {
			font-size: rem(10px);
			color: #9c9c9c;
			display: flex;
			margin: auto 0 0 auto;
		}
		@media screen and (max-width: 767px) {
			width: 100%;
			padding: 25px 15px;
		}
		@media print {
			&_result {
				opacity: 1;
			}
		}
	}

	.products {
		&__item {
			border-bottom: 1px solid #e3e3e3;
			padding: 10px 0 12px;
		}
		&__image {
			width: 45px;
			height: 45px;
			border-radius: 1px;
			border: 1px solid #e3e3e3;
			background-color: #f3f3f3;
		}
		&__info {
			flex-direction: column;
			padding: 0;
		}
		&__name {
			color: #777879;
			margin-bottom: 5px;
		}
		&__variant,
		&__quantity {
			font-size: rem(10px);
			color: $black;
		}
	}
</style>
