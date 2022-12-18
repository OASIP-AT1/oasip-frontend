<script setup>
import { useRouter } from "vue-router";

const appRouter = useRouter();
const loginRouter = () => appRouter.push({ name: "loginContents" });

</script>

<template>
    <div class="container">
        <div class="child">
            <div class="flex justify-start text-6xl font-black pt-5">Welcome to</div>
            <div class="flex justify-start text-4xl font-bold font-color pt-5">OASIP-AT1</div>
            <div class="flex justify-start text-lg pt-5 text-gray-500 font-normal">
                This is a website that will help you manage your appointment
                time.
            </div>
            <div class="mt-10">
                <button @click.left="loginRouter" class="btn btn-color px-10">Get Start</button>
            </div>
        </div>
            <img class="m-auto" src="../assets/home.png" alt="">
    </div>
</template>

<style scoped>
.font-color{
    color: #fc6f07;
}
.container {
    margin-left: 10rem;
    width: auto;
    /* height: 500px; */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

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
.child {
    height: 250px;
    width: 45%;
}
</style>
