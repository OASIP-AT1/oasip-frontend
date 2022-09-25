<script setup>
import { ref } from "vue";
defineEmits(["create"]);
const props = defineProps({
  users: {
    type: Array,
    require: true,
  },
});

const isModalOn = ref(false);
const Name = ref("");
const Email = ref("");
const option = ref("student");
const roles = ["student", "lecturer", "admin"];
const Password = ref("");
const Conpass = ref("");
const error = ref(false);

const empty = (name) => {
  if (name.trim() == "") {
    error.value = true;
  } else {
    error.value = false;
  }
};

const isunique = ref(false);
const Nerror = ref(false);

const uniquename = (name) => {
  props.users.forEach((e) => {
    if (e.name.toLowerCase() == name.trim().toLowerCase()) {
      isunique.value = true;
      Nerror.value = true;
    }
  });
};
const Eerror = ref(false);
const uniqueemail = (email) => {
  props.users.forEach((e) => {
    if (e.email.toLowerCase() == email.trim().toLowerCase()) {
      isunique.value = true;
      Eerror.value = true;
    }
  });
};

const errorpass = ref(false);
const confirmPass = (pass, conpass) => {
  if (pass !== conpass) {
    errorpass.value = true;
  }
};

const showpassword = ref(false);
const togglepassword = () => {
  showpassword.value = !showpassword.value;
};
const showpassword2 = ref(false);
const togglepassword2 = () => {
  showpassword2.value = !showpassword2.value;
};

const resetError = () => {
  error.value = false;
  Nerror.value = false;
  Eerror.value = false;
  errorpass.value = false;
};

const resetClicks = () => {
  Name.value = "";
  Email.value = "";
  option.value = "student";
  Password.value = "";
  Conpass.value = "";
  error.value = false;
  Nerror.value = false;
  Eerror.value = false;
  isunique.value = false;
  showpassword.value = true;
  showpassword2.value = true;
  errorpass.value = false;
};
</script>

<template>
  <div id="create">
    <button
      class="btn text-xl font-extrabold px-10 btn-color"
      @click="
        resetClicks();
        isModalOn = !isModalOn;
      "
    >
      CREATE
    </button>
    <div v-show="isModalOn" class="modal-show flex justify-center">
      <div class="modal-content bg-base-100 rounded-2xl">
        <div class="flex justify-end">
          <button class="close" @click="isModalOn = !isModalOn">x</button>
        </div>
        <!-- form -->
        <form
          method="post"
          @submit.prevent="
            $emit('create', Name, Email, option, Password, isunique, errorpass);
            error == true
              ? isModalOn
              : isunique == true
              ? isModalOn
              : errorpass == true
              ? isModalOn
              : (isModalOn = !isModalOn);
            isunique = false;
            // resetError();
          "
        >
          <!-- UserName -->
          <div class="grid justify-center">
            <label for="username"
              >Username
              <span class="auto-fill">({{ Name.length }}/100)</span></label
            >
            <div class="py-3">
              <input
                type="text"
                v-model="Name"
                maxlength="100"
                class="input input-md border-slate-400 w-96 max-w-xs bg-white mb-5"
                placeholder="Your name"
                required
              />
            </div>
            <p class="text-red-600" v-show="error">Error!!! Empty element</p>
            <p class="text-red-600" v-show="Nerror">Error!!! unique element</p>

            <!-- Email -->
            <label for="Email"
              >Email
              <span class="auto-fill">({{ Email.length }}/50)</span></label
            >
            <div class="py-3">
              <input
                type="email"
                v-model="Email"
                maxlength="50"
                class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                placeholder="Your email"
                required
              />
            </div>
            <p class="text-red-600" v-show="Eerror">Error!!! unique element</p>

            <!-- password -->
            <label for="Email"
              >Password
              <span class="auto-fill">({{ Password.length }}/8-14)</span></label
            >
            <div class="py-3 flex items-center">
              <input
                v-if="showpassword"
                type="password"
                v-model="Password"
                minlength="8"
                maxlength="14"
                class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                placeholder="Your password"
                required
              />
              <input
                v-else
                type="text"
                v-model="Password"
                minlength="8"
                maxlength="14"
                class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                placeholder="Your password"
                required
              />
              <button @click="togglepassword" v-if="showpassword">
                <svg
                  class="text-gray-800 mb-3 cursor-pointer -ml-8"
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
              </button>
              <button @click="togglepassword" v-else>
                <svg
                  class="text-gray-800 mb-3 cursor-pointer -ml-8"
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
              </button>
            </div>

            <!-- confirm password -->
            <label for="password"
              >Confirm Password
              <span class="auto-fill">({{ Conpass.length }}/8-14)</span></label
            >
            <div class="py-3 flex items-center">
              <input
                v-if="showpassword2"
                type="password"
                v-model="Conpass"
                minlength="8"
                maxlength="14"
                class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                placeholder="Confirm your password"
                required
              />
              <input
                v-else
                type="text"
                v-model="Conpass"
                minlength="8"
                maxlength="14"
                class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                placeholder="Confirm your password"
                required
              />
              <button @click="togglepassword2" v-if="showpassword2">
                <svg
                  class="text-gray-800 mb-3 cursor-pointer -ml-8"
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
              </button>
              <button @click="togglepassword2" v-else>
                <svg
                  class="text-gray-800 mb-3 cursor-pointer -ml-8"
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
              </button>
            </div>
            <p class="text-red-600" v-show="errorpass">
              Error!!! password not match!!!
            </p>

            <!-- Role -->
            <label for="role">Role</label>
            <div class="py-3">
              <select
                name="roles"
                class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                v-model="option"
                required
              >
                <option v-for="role in roles" :key="role">{{ role }}</option>
              </select>
            </div>
          </div>
          <div class="pt-2">
            <input
              class="justify-start btn bg-yellow-600 hover:bg-yellow-700 text-white"
              type="reset"
              value="Reset"
            />
            <!-- Create -->
            <input
              class="float-right justify-end btn btn-primary"
              type="submit"
              value="Create"
              @click="
                resetError();
                empty(Name);
                uniquename(Name);
                uniqueemail(Email);
                confirmPass(Password, Conpass);
              "
            />
          </div>
        </form>
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
.form-password {
  border-color: #494a7d;
  border-width: 2px;
  padding: 10px;
  border-top-left-radius: 0.375rem; /* 6px */
  border-bottom-left-radius: 0.375rem; /* 6px */
}
.form-eye {
  border-color: #494a7d;
  padding: 8px;
  border-width: 2px;
  border-top-right-radius: 0.375rem; /* 6px */
  border-bottom-right-radius: 0.375rem; /* 6px */
}
.form-element {
  border-color: #494a7d;
  border-radius: 5px;
  padding: 10px;
  border-width: 2px;
  width: 100%;
}
.form-element:focus {
  outline: none !important;
  border: 2px solid #fcc302;
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
.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(82, 80, 80);
  text-decoration: none;
  cursor: pointer;
}
.auto-fill {
  color: #8f8f8f;
}
</style>
