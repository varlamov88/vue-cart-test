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
        }
    },
    methods: {
        checkErrors() {
            for (let i in this.fields) {
                if (this.fields[i].required && !this.fields[i].value.length) {
                    this.fields[i].error.show = true;
                }
            }
        },
        fillFromStore(obj) {
            if (Object.keys(obj).length) {
                for (let field in this.fields) {
                    this.fields[field].value = (obj[field] || this.fields[field].value);
                }
            }
        }
    }
}