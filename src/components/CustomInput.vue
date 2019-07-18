<template>
	<div class="form__group">
		<div v-if="field.required && field.error.show" class="form__field-error">{{field.error.message}}</div>
		<input
			class="form__field"
			:class="[inputClass, {'form__field_error': (field.required && field.error.show)}]"
			:type="inputType"
			:placeholder="field.placeholder"
			v-model="field.value"
		/>
	</div>
</template>

<script>
import "../../node_modules/jquery.maskedinput/src/jquery.maskedinput.js";
export default {
	name: "CustomInput",
	props: {
		field: {
			type: Object,
			default: {
				value: "",
				placeholder: "",
				required: false,
				error: {
					message: "",
					show: false
				}
			}
		},
		inputType: {
			type: String,
			default: "text"
		},
		inputClass: [String, Array, Object],
		inputMask: {
			type: String,
			default: ""
        }
	},
	methods: {
		hideError() {
			this.field.error.show = false;
		}
	},
	created() {
		this.$watch(
			function() {
				return this.field.value;
			},
			function(newVal, oldVal) {
				this.hideError();
			}
		);
	},
	mounted() {
		let vm = this;
		if (this.inputMask.length) {
			$(this.$el)
				.find("input")
				.mask(this.inputMask, {
					completed() {
                        vm.field.value = this.val();
					}
				});
		}
	}
};
</script>
