<template>
	<div class="billing registration__billing">
        <div class="row billing__header">
            <div class="heading col col-auto">Billing information</div>
            <a class="col col-auto billing__sameAs" href="#" @click.prevent="fillFromStore($store.state.user.shipping)">Same as shipping</a>
        </div>
		<form class="form billing__form" @submit.prevent="nextStep">
			<div class="form__block mb-30">
				<div class="sub-heading">Billing contact</div>
                <CustomInput inputType="text" :field="fields.fullName"></CustomInput>
                <CustomInput inputClass="form__field_noTransform" inputType="text" :field="fields.email"></CustomInput>
			</div>

			<div class="form__block mb-10">
				<div class="sub-heading">Billing address</div>
                <CustomInput inputType="text" :field="fields.street"></CustomInput>
                <CustomInput class="mb-20" inputType="text" :field="fields.gate"></CustomInput>
                <CustomInput class="mb-20 form__group-city" inputType="text" :field="fields.city"></CustomInput>
				<div class="row">
					<div class="col col-55">
						<div class="form__group">
							<div
								v-if="fields.country.required && fields.country.error.show"
								class="form__field-error"
							>{{fields.country.error.message}}</div>
							<select
								class="form__field"
								:data-error="fields.country.required && fields.country.error.show"
								:data-placeholder="fields.country.placeholder"
								id="country"
								v-model="fields.country.value"
							>
								<option v-for="(country, key) in countries" :key="key" :value="key">{{country}}</option>
							</select>
						</div>
					</div>
					<div class="col">
                        <CustomInput inputClass="form__field_noTransform" inputType="text" :field="fields.zip"></CustomInput>
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
import {mix} from "@/mixins/cart.js";
export default {
    name: "Billing",
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
				email: {
					value: "",
					placeholder: "Email address",
					required: true,
					error: {
						message: "Please enter email",
						show: false
					}
				},
				street: {
					value: "",
					placeholder: "Street address",
					required: true,
					error: {
						message: "Please enter street",
						show: false
					}
				},
				gate: {
					value: "",
					placeholder: "Apt, Suite, Bldg, Gate Code. (optional)",
					required: false,
					error: {
						message: "Please enter gate",
						show: false
					}
				},
				city: {
					value: "",
					placeholder: "City",
					required: true,
					error: {
						message: "Please enter city",
						show: false
					}
				},
				country: {
					value: "",
					placeholder: "Country",
					required: true,
					error: {
						message: "Please enter country",
						show: false
					}
				},
				zip: {
					value: "",
					placeholder: "ZIP",
					required: true,
					error: {
						message: "Please enter zip",
						show: false
					}
				}
			}
		};
	},
	computed: {
		countries() {
			return this.$store.state.countries;
		}
    },
    components: {
        CustomInput
    },
	methods: {
		nextStep() {
			this.checkErrors();

			if (this.canContinue) {
				this.$store.commit("setUser", {
					key: "billing",
					value: this.fieldsValues
				});
				this.$parent.$emit("nextStep");
			}
        }
	},
	created() {
        this.$watch(
			function() {
				return this.fields.country.value;
			},
			function(newVal, oldVal) {
				$("#country").val(newVal).trigger("change");
			}
		);

        this.fillFromStore(this.$store.state.user.billing);
		this.$nextTick(function() {
            $("#country").select2().on("change", (e) => {
                this.fields.country.error.show = false;
                this.fields.country.value = e.target.value;
			});
		});
	}
};
</script>

<style lang="scss">

</style>