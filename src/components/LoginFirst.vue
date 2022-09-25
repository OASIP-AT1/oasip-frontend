<script setup>
import { useRouter } from "vue-router";
const appRouter = useRouter();
const LoginRouter = () => appRouter.push({ name: "loginContents" });

</script>
 
<template>
      <div class="text-center">
        <img
          class="mt-32 w-3/12 h-auto mx-auto"
          src='../assets/loginimage.jpg'
          alt=""
        />
        <p class="font-extrabold text-gray-400 text-2xl ">PLEASE LOGIN FIRST !!!</p>
        <button
        @click.left="LoginRouter"
        class="btn btn-color mt-5 text-base px-10">Go Login</button>
      </div>
</template>
 
<style>
.btn-color {
  @apply border-transparent;
  color: white;
  background-color: #f99952;
}

</style>