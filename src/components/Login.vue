<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const appRouter = useRouter();
const signUpRouter = () => appRouter.push({ name: "signUpContents" });

const username = ref("");
const password = ref("");
const error = ref("");
const token = ref("");

const reloadPage = () => {
    location.replace('/schedule')
};

//POST
const LoginUsers = async (username, password) => {
  var bearer_token = 'Bearer ' + localStorage.getItem('token')
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
    token.value = await res.json();
    localStorage.setItem("token",'Bearer ' + token.value.accessToken);
    console.log(bearer_token)
    error.value = false;
  } else {
    console.log(bearer_token)
    error.value = true;
    console.log("error, cannot be login");
  }
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
      <input
        type="password"
        v-model="password"
        placeholder="password"
        class="input input-md border-slate-400 w-full max-w-xs bg-white rounded-full mb-3"
        required
      />

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
