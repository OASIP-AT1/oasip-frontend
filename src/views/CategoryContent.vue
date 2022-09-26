<script setup>
import Category from "../components/Category.vue";
</script>

<template>
  <div class="container">
    <div class="child">
    <h1 class="inline-block text-5xl font-medium pt-5 pl-32 pr-5">
      Category Event
    </h1>
    <Category />
  </div>
</div>
</template>

<style scoped>
  .container {
    width: auto;
    height: auto;
    justify-content: center;
    align-items: center;
}
.child {
    height: 250px;
}
</style>
