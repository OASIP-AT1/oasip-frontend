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
      class="btn text-xl font-extrabold px-10"
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
                class="form-element bg-base-100 italic"
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
                class="form-element bg-base-100 border-b-2 italic"
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
                class="form-password bg-base-100 w-72"
                placeholder="Your password"
                required
              />
              <input
                v-else
                type="text"
                v-model="Password"
                minlength="8"
                maxlength="14"
                class="form-password bg-base-100 w-72"
                placeholder="Your password"
                required
              />
              <button @click="togglepassword" v-if="showpassword">
                <svg
                  style="color: white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill border w-10 h-12 p-1 form-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                    fill="white"
                  ></path>
                  <path
                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <button @click="togglepassword" v-else>
                <svg
                  style="color: white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill border w-10 h-12 p-1 form-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                    fill="white"
                  ></path>
                  <path
                    d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                    fill="white"
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
                class="form-password bg-base-100 w-72"
                placeholder="Confirm your password"
                required
              />
              <input
                v-else
                type="text"
                v-model="Conpass"
                minlength="8"
                maxlength="14"
                class="form-password bg-base-100 w-72"
                placeholder="Confirm your password"
                required
              />
              <button @click="togglepassword2" v-if="showpassword2">
                <svg
                  style="color: white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill border w-10 h-12 p-1 form-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                    fill="white"
                  ></path>
                  <path
                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <button @click="togglepassword2" v-else>
                <svg
                  style="color: white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill border w-10 h-12 p-1 form-eye"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                    fill="white"
                  ></path>
                  <path
                    d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                    fill="white"
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
                class="select form-element bg-base-100 border-b-2 italic"
                v-model="option"
                required
              >
                <option v-for="role in roles" :key="role" >{{ role }}</option>
              </select>
            </div>
          </div>
          <div class="pt-2">
            <input class="justify-start btn bg-yellow-600 hover:bg-yellow-700 text-white" type="reset" value="Reset" />
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

<style>
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
