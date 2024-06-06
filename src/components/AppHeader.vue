<template>
  <nav class="navbar navbar-expand-lg bg-primary mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-light">Home</router-link>
      <div class="flex-grow"></div>
      <button v-if="!size" data-testid="checkout" class="btn btn-secondary">Your cart is empty</button>
      <RouterLink :to="{ name: 'checkout' }" v-else data-testid="checkout" class="btn btn-secondary">
        {{ size }} product in your cart
      </RouterLink>
    </div>
  </nav>
</template>
<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
const store = useCartStore();

const size = computed(() => store.size);
</script>
