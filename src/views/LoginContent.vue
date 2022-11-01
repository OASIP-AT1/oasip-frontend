<script setup>
import login from "../components/forms/Login.vue";
</script>

<template>
    <div class="container">
        <div class="child">
        <login />
    </div>
    </div>
</template>

<style scoped>
.container {
    margin: 25px;
    width: 350px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
    height: 250px;
}
</style>
