<template>
    <div class="result">
        <div class="heading">Thank you for your order!</div>
        <div class="mb-10 bold">Order number is: {{order.id}}</div>
        <div class="mb-20">Your will recieve an email confirmation shortly to {{order.email}}</div>
        <div class="mb-20">Estimated delivery Day is <span class="bold">{{order.deliveryDate}}</span></div>
        <a href="#" class="result__print hide-on-print" @click.prevent="print">Print Recipe</a>
    </div>
</template>

<script>
export default {
    name: "Result",
    props: ["order"],
    methods: {
        print() {
            window.print();
        }
    }
}
</script>

