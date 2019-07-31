export const mix = {
	computed: {
		canContinue() {
			return !Object.values(this.fields).some(
				item => item.error.show && item.required
			);
		},
		fieldsValues() {
			let obj = {};
			for (let i in this.fields) {
				obj[i] = this.fields[i].value;
			}
			return obj;
		},
		countries() {
			return this.$store.state.countries;
		},
		fillLocation() {
			return {
				show: true,
				disabled: !this.$store.state.canUseLocation
			}
		}
	},
	methods: {
		nextStep(key, event = "nextStep") {
			this.checkErrors();

			if (this.canContinue) {
				this.$store.commit("setUser", {
					key: key,
					value: this.fieldsValues
				});
				this.$parent.$emit(event);
			}
		},
		checkErrors() {
			for (let i in this.fields) {
				if (this.fields[i].required && !this.fields[i].value) {
					this.fields[i].error.show = true;
				}
			}
		},
		fillFromStore(obj) {
			if (Object.keys(obj).length) {
				for (let field in this.fields) {
					this.fields[field].value = obj[field] || this.fields[field].value;
				}
			}
		}
	},
	created() {
		this.$on("fillLocation", function () {
			this.fillFromStore(this.$store.state.user.location);
		});
	}
};
