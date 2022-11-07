<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import TokenService from "../../services/token.js";

const appRouter = useRouter();
const signUpRouter = () => appRouter.push({ name: "signUpContents" });

const username = ref("");
const password = ref("");
const error = ref("");

const refreshTokenFunction = inject("refreshTokenFunction");

const reloadPage = () => {
    location.replace("/at1/schedule");
};

//POST
const LoginUsers = async (username, password) => {
    if(!!username.match(/^([a-zA-Z0-9._-])+@\w+([a-zA-Z0-9._-])*(\.[a-zA-Z0-9_-]{2,10})+$/)){
        const res = await fetch(import.meta.env.VITE_LOGIN_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        });
        if (res.status === 200) {
            console.log("Login successfully");
            const token = await res.json();
            TokenService.setAccessToken(token.accessToken);
            TokenService.setRefreshToken(token.refreshToken);
            TokenService.setRole(token.role);
            error.value = false;
        } else {
            error.value = true;
            console.log("error, cannot be login");
        }
    }
};

const hidden = ref(false);
const togglepassword = () => {
    hidden.value = !hidden.value;
};
</script>

<template>
    <div class="grid justify-center">
        <p class="text-5xl p-5 font-black grid justify-center">OASIP-AT1</p>
        <form
            action="post"
            @submit.prevent="LoginUsers(username, password)"
            class="text-black grid justify-center"
        >
            <input
                type="email"
                v-model="username"
                placeholder="username"
                class="input input-md border-slate-400 w-96 max-w-xs bg-white rounded-full mb-5"
                required
            />
            <div v-if="!hidden" class="flex -space-x-7">
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                    minlength="8"
                />
                <svg
                    class="text-gray-800 mt-4 cursor-pointer"
                    @click.left="togglepassword"
                    width="24"
                    height="16"
                    fill="none"
                    viewBox="0 0 22 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </div>
            <div v-else class="flex -space-x-7">
                <input
                    type="type"
                    placeholder="Password"
                    v-model="password"
                    class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                    minlength="8"
                /><svg
                    class="text-gray-800 mt-4 cursor-pointer"
                    @click.left="togglepassword"
                    width="24"
                    height="16"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.87313 14.129C4.02813 12.819 2.56813 11.115 1.74313 10.039C1.51244 9.74198 1.38721 9.37659 1.38721 9.0005C1.38721 8.62441 1.51244 8.25902 1.74313 7.962C3.23613 6.013 6.81813 2 11.0001 2C12.8761 2 14.6301 2.807 16.1301 3.874"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M13.13 6.887C12.8523 6.60467 12.5214 6.38011 12.1565 6.22629C11.7916 6.07246 11.3998 5.99241 11.0038 5.99075C10.6078 5.98909 10.2154 6.06586 9.84915 6.21662C9.48295 6.36738 9.15022 6.58916 8.87016 6.86915C8.5901 7.14915 8.36824 7.48183 8.21739 7.84799C8.06654 8.21416 7.98969 8.60657 7.99125 9.00259C7.99282 9.3986 8.07278 9.79039 8.22652 10.1554C8.38026 10.5203 8.60473 10.8512 8.887 11.129M3 17L19 1M9 15.704C9.6492 15.8972 10.3227 15.9969 11 16C15.182 16 18.764 11.987 20.257 10.038C20.4876 9.74071 20.6127 9.37509 20.6125 8.99883C20.6124 8.62256 20.4869 8.25707 20.256 7.96C19.7313 7.27549 19.1684 6.62112 18.57 6"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </div>

            <div class="text-center">
                Don't have an account?
                <span
                    class="font-semibold underline underline-offset-2"
                    @click.left="signUpRouter"
                    ><a href="#">Sign up</a></span
                >
            </div>
            <div class="flex justify-end">
                <input
                    type="submit"
                    value="Login"
                    class="btn mt-5 rounded-full btn-color"
                />
            </div>
        </form>
        <div v-show="error === false" class="modal-show flex justify-center">
            <div class="modal-content">
                <div class="text-center alert alert-success shadow-lg w-full">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Login successfully.</span>
                    </div>
                    <div class="flex justify-end">
                        <button
                            @click.left="reloadPage"
                            class="btn btn-sm text-green-600 bg-white hover:bg-slate-200 px-5"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="error === true" class="modal-show flex justify-center">
            <div class="modal-content">
                <div class="alert alert-error shadow-lg">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Error! failed login successfully.</span>
                    </div>
                    <div class="flex justify-end">
                        <button
                            @click.left="error = null"
                            class="btn btn-sm text-red-600 bg-white hover:bg-slate-200 px-5"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
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

.modal-content {
    margin: auto;
    padding: 20px;
    width: 500px;
}
.modal-show {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(32, 32, 32);
    background-color: rgba(73, 73, 73, 0.4);
}
</style>
