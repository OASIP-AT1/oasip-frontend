<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    
    defineEmits(["accesstoken"]);
    
    const appRouter = useRouter();
    const email = ref();
    const password = ref();
    const error = ref(false);
    const token = ref('')
    
    const scheduleRouter = () => appRouter.push({ name: "scheduleContents" });
    
    //POST
    const LoginUsers = async (email, password) => {
        const res = await fetch(import.meta.env.VITE_LOGIN_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        });
        if (res.status === 200) { 
          token.value = await res.json();
          localStorage.setItem('token', token.value.token);
          console.log("Login successfully");
          error.value = false;
          scheduleRouter();
    
        } else{
          alert("Password not matched");
          error.value = true;
          console.log("error, cannot be login");
        }
      }
    </script>
    
    <template>
      <div id="center">
        <span class="p-10">OASIP-AT-1</span>
        <br />
        <form action="post" 
        @submit.prevent="LoginUsers(email, password); ">
          <div class="flex items-center mt-5">
            <svg
              style="color: white"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-person-circle mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="white"></path>
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                fill="white"
              ></path>
            </svg>
    
            <input
              type="email"
              v-model="email"
              placeholder="email"
              class="text-black input input-bordered input-md w-full max-w-xs bg-white rounded-full"
            />
          </div>
    
          <div class="flex items-center mt-5">
            <svg
              style="color: white"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-lock-fill mr-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                fill="white"
              ></path>
            </svg>
            <input
              type="password"
              v-model="password"
              placeholder="password"
              class="text-black input input-bordered input-md w-full max-w-xs bg-white rounded-full"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary rounded-full w-full max-w-xs"
            @click="$emit('accesstoken',token)"
          >
            Login
          </button>
        </form>
      </div>
    </template>
    
    <style scoped>
    #center {
      font-size: 3em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    </style>
    