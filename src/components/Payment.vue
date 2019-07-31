<template>
	<div class="payment registration__payment">
		<div class="heading">Payment</div>
		<div class="payment__secure mb-20">This is a secure 128-bit SSL encrypted payment</div>
		<form class="form billing__form" @submit.prevent="nextStep('payment', 'makeOrder')">
			<div class="form__block">
				<CustomInput input-type="text" :field="fields.fullName" :show-heading="true"></CustomInput>
			</div>

			<div class="form__block">
				<CustomInput
					input-mask="#### #### #### ####"
					input-class="form__field_noTransform"
					input-type="text"
					:field="fields.cardNumber"
					:show-heading="true"
				></CustomInput>
			</div>
			<div class="form__block">
				<div class="row">
					<div class="col col-column">
						<CustomInput
							input-mask="##/##"
							input-class="form__field_noTransform"
							input-type="text"
							:field="fields.expireDate"
							:show-heading="true"
						></CustomInput>
					</div>
					<div class="col col-column">
						<CustomInput
							input-mask="###"
							input-class="form__field_noTransform"
							input-type="text"
							:field="fields.cvv"
							:show-heading="true"
						></CustomInput>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col col-55">
					<button class="button button_accent button_100" type="submit">Pay securely</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import CustomInput from "@/components/CustomInput.vue";
import { mix } from "@/mixins/cart.js";

export default {
	name: "Payment",
	components: {
		CustomInput
	},
	mixins: [mix],
	data() {
		return {
			fields: {
				fullName: {
					value: "",
					name: "Full name",
					required: true
				},
				cardNumber: {
					value: "",
					name: "Card Number",
					placeholder: "xxxx xxxx xxxx xxxx",
					required: true
				},
				expireDate: {
					value: "",
					name: "Expire date",
					placeholder: "MM/YY",
					required: true
				},
				cvv: {
					value: "",
					name: "Security code",
					placeholder: "",
					required: true
				}
			}
		};
	},
	created() {
		this.fillFromStore(this.$store.state.user.payment);
	}
};
</script>

<style lang="scss">
	@import "../scss/rem";
	@import "../scss/variables";
	.payment {
		&__secure {
			color: $dark-gray;
			font-size: rem(15px);
			font-weight: 300;
			position: relative;
			padding-left: 25px;
			&::before {
				content: "";
				width: 19px;
				height: 26px;
				background: url(../images/svg/security.svg);
				position: absolute;
				top: 0;
				left: 0;
				display: block;
			}
		}
	}
</style>
