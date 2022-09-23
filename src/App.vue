<script setup>
import NavbarContent from "./views/NavbarContent.vue"
</script>

<template>
  <div class="font-style">
    <NavbarContent/>
    <div class="flex justify-center">
    <router-view></router-view>
  </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
.font-style{
  font-family: 'Poppins', sans-serif  
}
</style>
