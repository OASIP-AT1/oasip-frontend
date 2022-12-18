<script setup>
import AddEvent from "../components/events/AddSchedules.vue";
</script>

<template>
    <div class="container">
      <div class="child text-gray-500">
        <AddEvent />
      </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
    height: auto;
}
</style>
