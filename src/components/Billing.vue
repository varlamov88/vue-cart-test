<template>
	<div class="billing registration__billing">
		<div class="row billing__header">
			<div class="heading col col-auto">Billing information</div>
			<a
				class="col col-auto billing__sameAs"
				href="#"
				@click.prevent="fillFromStore($store.state.user.shipping)"
			>Same as shipping</a>
		</div>
		<form class="form billing__form" @submit.prevent="nextStep('billing')">
			<div class="form__block mb-30">
				<div class="sub-heading">Billing contact</div>
				<CustomInput input-type="text" :field="fields.fullName"></CustomInput>
				<CustomInput input-class="form__field_noTransform" input-type="text" :field="fields.email"></CustomInput>
			</div>

			<div class="form__block mb-10">
				<div class="sub-heading">Billing address</div>
				<CustomInput input-type="text" :field="fields.street"></CustomInput>
				<CustomInput class="mb-20" input-type="text" :field="fields.gate"></CustomInput>
				<CustomInput class="mb-20" input-type="text" :field="fields.city" :fill-location="fillLocation"></CustomInput>
				<div class="row">
					<div class="col col-55">
						<custom-select :field="fields.country" :options="countries" label="name" track-by="code" :showLabels="false"></custom-select>
					</div>
					<div class="col">
						<CustomInput input-class="form__field_noTransform" input-type="text" :field="fields.zip"></CustomInput>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col col-55">
					<button class="button button_accent button_100" type="submit">Continue</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import { mix } from "@/mixins/cart.js";
export default {
	name: "Billing",
	components: {
		CustomInput,
		CustomSelect
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
				email: {
					value: "",
					name: "Email address",
					required: true
				},
				street: {
					value: "",
					name: "Street address",
					required: true
				},
				gate: {
					value: "",
					name: "Apt, Suite, Bldg, Gate Code. (optional)",
					required: false
				},
				city: {
					value: "",
					name: "City",
					required: true
				},
				country: {
					value: "",
					name: "Country",
					required: true
				},
				zip: {
					value: "",
					name: "ZIP",
					required: true
				}
			}
		};
	},
	created() {
		this.fillFromStore(this.$store.state.user.billing);
	}
};
</script>

<style lang="scss">
	@import "../scss/rem";
	@import "../scss/variables";
	.billing {
		&__header {
			align-items: baseline;
		}
		&__sameAs {
			font-size: rem(12px);
			color: $accent;
		}
	}
</style>
