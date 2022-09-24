<script setup>
import { useRouter } from "vue-router";

const appRouter = useRouter();
const loginRouter = () => appRouter.push({ name: "loginContents" });

</script>
 
<template>
    <buttons id="signout" class="btn font-extrabold px-10 bg-red-600 text-white hover:bg-red-700" @click="loginRouter">SIGNOUT</buttons>
</template>
 
<style>
#signout {
    position: absolute;
    right: 15%;
    top: 3%;
}
</style>