<template>
  <div class="layout">
    <AppHeader />
    <slot></slot>
  </div>
</template>
<script setup>
import AppHeader from "@/components/AppHeader.vue";
</script>
