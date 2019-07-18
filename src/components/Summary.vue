<template>
	<div class="summary">
		<div class="summary__top row">
			<div class="sub-heading col">Order summary</div>
			<a class="col col-auto summary__edit hide-on-print" href="#" @click.prevent>edit order</a>
		</div>
        <template v-if="products.length">
            <div class="products">
                <div class="products__item" v-for="product in products" :key="product.id">
                    <div class="row">
                        <div class="col col-auto">
                            <div class="products__image">
                                <img class="products__img" :src="product.img" :alt="product.name" v-if="product.img" />
                            </div>
                        </div>
                        <div class="products__info col">
                            <div class="products__name">{{product.name}}</div>
                            <div class="products__variant">{{product.variant}}</div>
                            <div class="products__quantity">Quantity: {{product.quantity}}</div>
                        </div>
                        <div class="products__price col col-auto">{{product.price | toCurrency}}</div>
                    </div>
                </div>
            </div>
            <div class="summary__info">
                <div class="summary__info-item row">
                    <div class="summary__info-text col">Subtotal</div>
                    <div class="summary__info-value col col-auto">{{subtotal | toCurrency}}</div>
                </div>
                <div class="summary__info-item row">
                    <div class="summary__info-text col">Shipping</div>
                    <div class="summary__info-value col col-auto">{{shipping ? shipping : "Free" | toCurrency}}</div>
                </div>
                <div class="summary__info-item row">
                    <div class="summary__info-text col">Taxes</div>
                    <div class="summary__info-value col col-auto">{{taxes | toCurrency}}</div>
                </div>
            </div>
            <div class="summary__total row">
                <div class="summary__total-text col">Total</div>
                <div class="summary__total-value col col-auto">{{total | toCurrency}}</div>
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
	data() {
		return {
            products: this.$store.state.products
        };
    },
    computed: {
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
    }
};
</script>

<style lang="scss">
</style>
