<template>
	<div class="shipping registration__shipping">
		<div class="heading">Shipping info</div>
		<form class="form shipping__form" @submit.prevent="nextStep">
			<div class="form__block">
				<div class="sub-heading">Recipient</div>
				<CustomInput inputType="text" :field="fields.fullName"></CustomInput>
				<div class="row">
					<div class="col col-55">
						<CustomInput inputMask="+7 (999) 999-99-99" inputClass="form__field_noTransform" inputType="text" :field="fields.phone"></CustomInput>
					</div>
					<div class="form__field-description col form__group">For delivery questions only</div>
				</div>
			</div>

			<div class="form__block mb-10">
				<div class="sub-heading">Address</div>
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
import axios from "axios";
import { mix } from "@/mixins/cart.js";

export default {
	name: "Shipping",
	mixins: [mix],
	data() {
		return {
			fields: {
				fullName: {
					value: "",
					placeholder: "Full name",
					required: true,
					error: {
						message: "Please enter recipient full name",
						show: false
					}
				},
				phone: {
					value: "",
					placeholder: "Daytime phone",
					required: true,
					error: {
						message: "Please enter recipient phone",
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
		locationFieldsValues() {
			return {
				street: this.fields.street.value,
				gate: this.fields.gate.value,
				city: this.fields.city.value,
				country: this.fields.country.value,
				zip: this.fields.zip.value
			};
		},
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
					key: "shipping",
					value: this.fieldsValues
				});
				this.$parent.$emit("nextStep");
			}
		},
		findLocation() {
			let geoOptions = {
				timeout: 10 * 1000,
				maximumAge: 5 * 60 * 1000
			};

			let geoSuccess = position => {
				axios
					.get(
						`https://geocode-maps.yandex.ru/1.x/?apikey=0990cb3d-336b-4255-a25b-76d0ace1a51f&geocode=${position.coords.longitude},${position.coords.latitude}&format=json&kind=house&lang=en_US`
					)
					.then(response => {
						this.fields.city.value =
							response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName;

						this.fields.country.value =
							response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.country_code;

						this.fields.zip.value =
							response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.postal_code;

						this.fields.street.value =
							response.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.Thoroughfare.ThoroughfareName;

						this.$store.commit("setUser", {
							key: "location",
							value: this.locationFieldsValues
						});
					})
					.catch(e => {
						console.log(e);
					});
			};
			let geoError = function(error) {
				console.log("Error occurred. Error code: " + error.code);
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

		this.fillFromStore(this.$store.state.user.shipping);

		if (!Object.keys(this.$store.state.user.location).length) {
			this.findLocation();
		}

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