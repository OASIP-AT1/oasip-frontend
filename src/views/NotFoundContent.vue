<script setup>
import { useRouter } from "vue-router";

const appRouter = useRouter();
const homeRouter = () => appRouter.push({ name: "homeContents" });
</script>

<template>
    <div class="container">
        <div class="child">
            <div class="flex justify-center text-6xl font-black py-5">
                Page dose not exist!
            </div>
            <div class="flex justify-center ">
                <button class="btn btn-color text-lg font-semibold" @click.left="homeRouter">Go back to OASIP-AT1</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: 25px;
    width: auto;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
    height: 150px;
}
.btn-color {
    @apply border-transparent;
    color: white;
    background-color: #f99952;
}

.btn-color:hover{
    @apply border-transparent;
    color: rgb(211, 209, 209);
    background-color: #f48c41;
}
</style>
