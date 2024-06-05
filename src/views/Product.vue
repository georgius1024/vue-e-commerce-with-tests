<template>
  <div class="container">
    <template v-if="loading">
      <div class="d-flex flex-row gap-4">
        <div class="spinner-grow" />
        <div class="spinner-grow" />
        <div class="spinner-grow" />
        <div class="spinner-grow" />
        <div class="spinner-grow" />
      </div>
      <p>Loading...</p>
    </template>
    <template v-else>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Categories</RouterLink>
        </li>
        <li class="breadcrumb-item text-capitalize">
          <RouterLink :to="{ name: 'category', params: { category } }">{{
            category
          }}</RouterLink>
        </li>
        <li class="breadcrumb-item active text-capitalize">
          {{ product.title }}
        </li>
      </ol>
      <div class="card w-50">
        <div id="carouselList" class="carousel slide">
          <div class="carousel-indicators">
            <button
              v-for="(_, index) in product.images"
              type="button"
              data-bs-target="#carouselListIndicators"
              :data-bs-slide-to="index"
              :class="{ active: index === 0 }"
            ></button>
          </div>
          <div class="carousel-inner">
            <div
              v-for="(image, index) in product.images"
              :class="{ active: index === 0, 'carousel-item': true }"
              :key="index"
            >
              <img :src="image" class="d-block w-100" :alt="product.title" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselList"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselList"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text text-primary">Price ${{ product.price }}</p>

          <button v-if="!isInCart" class="btn btn-primary" @click="addToCart">Add to cart</button>
          <button v-else class="btn btn-danger" @click="removeFromCart">Remove from cart</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useCartStore } from '@/stores/cart'
import getProduct from "@/services/product";

const store = useCartStore()

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
});
const loading = ref(false);
const product = ref({});
const load = async () => {
  loading.value = true;
  product.value = await getProduct(props.id);
  loading.value = false;
};
onMounted(load);


const isInCart = computed(() => store.inCart(props.id))

const addToCart = () => store.add(product.value)
const removeFromCart = () => store.remove(product.value)

</script>
