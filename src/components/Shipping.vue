<template>
	<div class="shipping registration__shipping">
		<div class="heading">Shipping info</div>
		<form class="form shipping__form" @submit.prevent="nextStep('shipping')">
			<div class="form__block">
				<div class="sub-heading">Recipient</div>
				<CustomInput input-type="text" :field="fields.fullName"></CustomInput>
				<div class="row">
					<div class="col col-55">
						<CustomInput
							input-mask="+# ### ### ####"
							input-class="form__field_noTransform"
							input-type="text"
							:field="fields.phone"
						></CustomInput>
					</div>
					<div class="form__field-description col form__group">For delivery questions only</div>
				</div>
			</div>

			<div class="form__block mb-10">
				<div class="sub-heading">Address</div>
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
import axios from "axios";
import { mix } from "@/mixins/cart.js";

export default {
	name: "Shipping",
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
				phone: {
					value: "",
					name: "Daytime phone",
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
					value: null,
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
	computed: {
		locationFieldsValues() {
			return {
				street: this.fields.street.value,
				gate: this.fields.gate.value,
				city: this.fields.city.value,
				country: this.fields.country.value,
				zip: this.fields.zip.value
			};
		}
	},
	created() {
		this.fillFromStore(this.$store.state.user.shipping);

		if (!Object.keys(this.$store.state.user.location).length) {
			this.findLocation();
		}
	},
	methods: {
		findLocation() {
			let geoOptions = {
				timeout: 10 * 1000,
				maximumAge: 5 * 60 * 1000
			};

			let geoSuccess = position => {
				this.$store.commit("setCanUseLocation", true);
				axios
					.get(
						`${this.$store.state.geoUrl}${position.coords.longitude},${position.coords.latitude}`
					)
					.then(response => {
						let data =
							response.data.response.GeoObjectCollection
								.featureMember[0].GeoObject.metaDataProperty
								.GeocoderMetaData;

						this.fields.city.value =
							data.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName;

						this.fields.country.value = {
							code: data.AddressDetails.Country.CountryNameCode,
							name: data.AddressDetails.Country.CountryName
						};

						this.fields.zip.value = data.Address.postal_code;

						this.fields.street.value =
							data.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.Thoroughfare.ThoroughfareName;

						this.$store.commit("setUser", {
							key: "location",
							value: this.locationFieldsValues
						});
					})
					.catch(e => {
						console.log(e);
					});
			};
			let geoError = error => {
				console.log("Error occurred. Error code: " + error.code);
				this.$store.commit("setCanUseLocation", false);
			};

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					geoSuccess,
					geoError,
					geoOptions
				);
			} else {
				console.log(
					"Geolocation is not supported for this Browser/OS version yet."
				);
			}
		}
	}
};
</script>