<template>
  <div class="container">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <RouterLink to="/">Categories</RouterLink>
      </li>
      <li class="breadcrumb-item active text-capitalize">{{ category }}</li>
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
    <div class="d-flex flex-row flex-wrap" >
      <ProductPreview
        v-for="product in products"
        :product="product"
        :key="product.id"
        class="mb-2 me-2"
        @click="navigate"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import listProducts from "@/services/products";
import ProductPreview from "@/components/ProductPreview.vue";
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const loading = ref(false);
const products = ref([]);
const load = async () => {
  loading.value = true;
  const data = await listProducts(props.category);
  products.value = data.products;
  loading.value = false;
};
onMounted(load);
const navigate = (id) => router.push({ name: "product", params: { id, category: props.category } });
</script>
