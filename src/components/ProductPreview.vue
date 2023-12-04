<template>
  <div
    class="card pointer hover-up"
    :data-testid="`product-preview-${product.id}`"
    @click="emit('click', product.id)"
  >
    <img :src="product.thumbnail" class="card-img-top" alt="preview" />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <span class="float-end badge rounded-pill fs-5 bg-primary mt-3 me-3">
        ${{ product.price }}
      </span>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
<style type="scss" scoped>
.card {
  width: 18rem;
}
.card-img-top {
  max-height: 24rem;
}
</style>