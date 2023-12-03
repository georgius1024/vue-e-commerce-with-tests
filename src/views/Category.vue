<template>
  <div class="container">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><RouterLink to="/">Categories</RouterLink></li>
      <li class="breadcrumb-item active text-capitalize">{{category}}</li>
    </ol>

    <h1>Products in category {{ category }}</h1>
    <template v-if="loading">
      <div class="spinner-grow" />
      <div class="spinner-grow" />
      <div class="spinner-grow" />
      <div class="spinner-grow" />
      <div class="spinner-grow" />
      <p>Loading...</p>
    </template>

    <ul v-else class="list-group">
      <li
        class="list-group-item text-capitalize"
        v-for="product in products"
        :key="product.id"
      >
      <img :src="product.thumbnail" class="preview me-3">
        <RouterLink :to="{ name: 'product', params: { id: product.id, category: product.category } }">
          {{ product.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import listProducts from "@/services/products";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const loading = ref(false);
const products = ref([]);
const load = async () => {
  loading.value = true;
  const data = await listProducts(props.category);
  products.value = data.products
  loading.value = false;
};
onMounted(load);
</script>
<style scoped lang="scss">
.preview {
  width: 48px;
  max-width: 48px;
  max-height: 48px;
}
</style>