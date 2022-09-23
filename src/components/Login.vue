<script setup>
import { useRouter } from "vue-router";
const appRouter = useRouter();
const signUpRouter = () => appRouter.push({ name: "signUpContents" });
</script>

<template>
        <div class="grid justify-center">
            <p class="text-5xl p-5 font-black grid justify-center">OASIP-AT1</p>
            <form class="text-black grid justify-center">
                <input
                    type="text"
                    placeholder="username"
                    class="input input-md border-slate-400 w-96 max-w-xs bg-white rounded-full mb-5"
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    class="input input-md border-slate-400 w-full max-w-xs bg-white rounded-full mb-3"
                    required
                />

                <div class="text-center">
                    Don't have an account?
                    <span class="font-semibold underline underline-offset-2" @click.left="signUpRouter"
                        ><a href="#">Sign up</a></span
                    >
                </div>
                <div class="flex justify-end">
                    <input
                        type="submit"
                        value="Login"
                        class="btn mt-5 rounded-full btn-color "
                    />
                </div>
            </form>
        </div>
</template>

<style scoped>

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
