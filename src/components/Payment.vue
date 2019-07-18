<template>
	<div class="payment registration__payment">
		<div class="heading">Payment</div>
		<div class="payment__secure mb-20">This is a secure 128-bit SSL encrypted payment</div>
		<form class="form billing__form" @submit.prevent="nextStep">
			<div class="form__block">
				<div class="sub-heading">Cardholder name</div>
				<CustomInput inputType="text" :field="fields.fullName"></CustomInput>
			</div>

			<div class="form__block">
				<div class="sub-heading">Card number</div>
				<CustomInput
					inputMask="9999 9999 9999 9999"
					inputClass="form__field_noTransform"
					inputType="text"
					:field="fields.cardNumber"
				></CustomInput>
			</div>
			<div class="form__block">
				<div class="row">
					<div class="col col-column">
						<div class="sub-heading">Expire date</div>
						<CustomInput
							inputMask="99/99"
							inputClass="form__field_noTransform"
							inputType="text"
							:field="fields.expireDate"
						></CustomInput>
					</div>
					<div class="col col-column">
						<div class="sub-heading">Security code</div>
						<CustomInput
							inputMask="999"
							inputClass="form__field_noTransform"
							inputType="text"
							:field="fields.cvv"
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
	mixins: [mix],
	data() {
		return {
			fields: {
				fullName: {
					value: "",
					placeholder: "Full name",
					required: true,
					error: {
						message: "Please enter full name",
						show: false
					}
				},
				cardNumber: {
					value: "",
					placeholder: "xxxx xxxx xxxx xxxx",
					required: true,
					error: {
						message: "Please enter card number",
						show: false
					}
				},
				expireDate: {
					value: "",
					placeholder: "MM/YY",
					required: true,
					error: {
						message: "Please enter expire date",
						show: false
					}
				},
				cvv: {
					value: "",
					placeholder: "",
					required: true,
					error: {
						message: "Please enter security code",
						show: false
					}
				}
			}
		};
	},
	components: {
		CustomInput
	},
	methods: {
		nextStep() {
			this.checkErrors();

			if (this.canContinue) {
				this.$store.commit("setUser", {
					key: "payment",
					value: this.fieldsValues
				});
				this.$parent.$emit("makeOrder");
			}
		}
	},
	created() {
		this.fillFromStore(this.$store.state.user.payment);
	}
};
</script>

<style lang="scss">
</style>