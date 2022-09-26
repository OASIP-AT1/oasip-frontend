<script setup>
import Schedules from "../components/Schedules.vue";
</script>

<template>
    <div class="container">
        <div class="child">
            <schedules />
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 1000px;
    height: 700px;
    justify-content: center;
    align-items: center;
}

.child {
    height: 700px;
}
</style>
