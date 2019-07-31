<template>
	<div class="w-100">
		<div class="sub-heading" v-if="showHeading">{{field.name}}</div>
		<div class="form__group">
			<div v-if="field.required && field.error.show" class="form__field-error">{{ field.error.message }}</div>
			<input
				v-model="field.value"
				class="form__field"
				:class="[
					inputClass,
					{ form__field_error: field.required && field.error.show }
				]"
				:type="inputType"
				:placeholder="(field.placeholder !== undefined ? field.placeholder : field.name)"
				v-mask="inputMask"
			/>
			<span
				v-if="fillLocation.show"
				class="fillLocation"
				:class="{'disabled': fillLocation.disabled}"
				@click="$parent.$emit('fillLocation')"
			></span>
		</div>
	</div>
</template>

<script>
export default {
	name: "CustomInput",
	props: {
		field: {
			type: Object,
			default: () => ({
				value: "",
				name: "",
				placeholder: "",
				required: false
			})
		},
		inputType: {
			type: String,
			default: "text"
		},
		inputClass: [String, Array, Object],
		inputMask: {
			type: String,
			default: ""
		},
		fillLocation: {
			type: Object,
			default: () => ({
				show: false,
				disabled: false
			})
		},
		showHeading: {
			type: Boolean,
			default: false
		}
	},
	created() {
		this.$watch(
			function() {
				return this.field.value;
			},
			function() {
				this.field.error.show = false;
			}
		);

        this.$set(this.field, "error", {
            show: false,
            message: `Please enter ${this.field.name}`
        });
	}
};
</script>

<style lang="scss" scoped>
.fillLocation {
	background: url("../images/svg/target.svg") no-repeat;
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate(-50%, -50%);
	cursor: pointer;
	&.disabled {
		opacity: 0.5;
		cursor: default;
	}
}
</style>
