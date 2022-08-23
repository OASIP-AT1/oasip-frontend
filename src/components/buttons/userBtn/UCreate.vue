<script setup>
import { ref, onBeforeMount } from "vue";
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
const option = ref();
const roles = ["admin", "lecturer", "student"];
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
</script>

<template>
  <div id="create">
    <button
      class="btn text-xl font-extrabold px-10"
      @click="
        Name = '';
        Email = '';
        option = undefined;
        error = false;
        Nerror = false;
        Eerror = false;
        isunique = false;
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
            $emit('create', Name, Email, option, isunique);
            error == true
              ? isModalOn
              : isunique == true
              ? isModalOn
              : (isModalOn = !isModalOn);
            isunique = false;
          "
        >
          <!-- Name -->
          <div class="grid justify-center">
            <label for="name"
              >Name
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

            <!-- Role -->
            <label for="role">Role</label>
            <div class="py-3">
              <select
                name="roles"
                class="select form-element bg-base-100 border-b-2 italic"
                v-model="option"
                required
              >
                <option v-for="role in roles">{{ role }}</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end pt-2">
            <!-- Create -->
            <input
              class="btn"
              type="submit"
              value="Create"
              @click="
                empty(Name);
                uniquename(Name);
                uniqueemail(Email);
              "
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
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
