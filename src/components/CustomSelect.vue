<template>
	<div class="w-100">
		<div class="sub-heading" v-if="showHeading">{{field.name}}</div>
		<div class="form__group">
			<div
				v-if="field.required && field.error.show"
				class="form__field-error"
			>{{ field.error.message }}</div>
			<multiselect
				v-model="field.value"
				:options="options"
				:placeholder="(field.placeholder !== undefined ? field.placeholder : field.name)"
				:label="label"
				:track-by="trackBy"
				:showLabels="showLabels"
			></multiselect>
		</div>
	</div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
    name: "CustomInput",
    components: {
        Multiselect
    },
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
        options: {
            type: Array
        },
		showHeading: {
			type: Boolean,
			default: false
        },
        label: {type: String},
        trackBy: {type: String},
		showLabels: {type: Boolean}
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