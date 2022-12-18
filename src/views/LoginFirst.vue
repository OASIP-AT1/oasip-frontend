<script setup>
import { useRouter } from "vue-router";
const appRouter = useRouter();
const LoginRouter = () => appRouter.push({ name: "loginContents" });
</script>

<template>
    <div class="text-center screen">
        <img
            class="w-1/4 h-auto mx-auto mt-0"
            src="../assets/loginimage.jpg"
            alt=""
        />
        <p class="font-normal text-gray-400 text-2xl">PLEASE LOGIN FIRST !!!</p>
        <button
            @click.left="LoginRouter"
            class="btn btn-color mt-5 text-base px-10"
        >
            Go Login
        </button>
    </div>
</template>

<style scoped>
.btn-color {
    @apply border-transparent;
    color: white;
    background-color: #f99952;
}

.btn-color:hover {
    @apply border-transparent;
    color: rgb(211, 209, 209);
    background-color: #f48c41;
}
.screen {
  width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
}
</style>
