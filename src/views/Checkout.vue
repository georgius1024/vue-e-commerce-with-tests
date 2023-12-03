<template>
  <div class="container">
    <h1>Products in your cart</h1>

    <div class="card w-50">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item text-capitalize"
          v-for="product in products"
          :key="product.id"
        >
          <img :src="product.thumbnail" class="me-3" width="48" />
          {{ product.title }}

          <span class="float-end text-danger pa-3" style="cursor: pointer;" @click="removeFromCart(product)">
            &times;
          </span>
        </li>
      </ul>
    </div>

    <button :disabled="!products.length" class="w-50 mt-3 btn btn-primary" @click="checkout">Checkout</button>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
const store = useCartStore();

const products = computed(() => store.cart);

const removeFromCart = (product) => store.remove(product)

const checkout = () => alert('Good try bro, but that doesn\'t work for now')
</script>
