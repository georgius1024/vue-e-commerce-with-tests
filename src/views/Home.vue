<template>
  <div class="container">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active">Categories</li>
    </ol>

    <h1>Categories</h1>
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
        v-for="category in categories"
        :key="category"
      >
        <RouterLink :to="{ name: 'category', params: { category } }">
          {{ category }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import listCategories from "@/services/categories";
import { RouterLink } from "vue-router";
const loading = ref(false);
const categories = ref([]);
const load = async () => {
  loading.value = true;
  categories.value = await listCategories();
  loading.value = false;
};
onMounted(load);
</script>
