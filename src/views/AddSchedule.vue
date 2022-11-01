<script setup>
import AddEvent from "../components/events/AddSchedules.vue";
</script>

<template>
    <div class="container">
      <div class="child">
        <AddEvent />
      </div>
    </div>
</template>

<style scoped>
.container {
    margin: 25px;
    width: 350px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
    height: auto;
}
</style>
