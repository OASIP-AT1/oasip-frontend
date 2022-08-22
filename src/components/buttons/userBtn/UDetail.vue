<script setup>
import moment from "moment";
import { ref } from "vue";

defineEmits(["moreDetail", "editDetail"]);
defineProps({
  detail: {
    type: Object,
    require: true,
  },
});

const edit = ref(false);
const isModalOn = ref(false);
const roles = ["admin", "lecturer", "student"];
</script>

<template>
  <button
    class="btn modal-button"
    @click="
      $emit('moreDetail');
      isModalOn = !isModalOn;
    "
  >
    Detail
  </button>
  <div v-show="isModalOn" class="modal-show flex justify-center">
    <div class="modal-content bg-base-100 rounded-2xl">
      <div class="flex justify-end">
        <button class="close" @click="isModalOn = !isModalOn">x</button>
      </div>
      <div class="flex justify-center">
        <div>
          <div class="text-3xl font-bold flex justify-center">
            <p v-show="!edit" class="font-header">
              {{ detail.name }}
            </p>
            <div v-show="edit" class="text-lg font-header">
              Name :
              <input
                type="text"
                v-model="detail.name"
                maxlength="100"
                class="text-black p-2 rounded-lg text-lg w-72"
              />
            </div>
            <button v-show="!edit" @click="edit = !edit" class="pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
          <div
            v-show="!edit"
            class="text-base font-medium grid justify-center py-2"
          >
            {{ detail.email }}
          </div>
          <div v-show="edit" class="font-bold text-lg font-header py-5">
            Email :
            <input
              type="email"
              v-model="detail.email"
              maxlength="50"
              class="text-black p-2 rounded-lg text-lg w-72"
            />
          </div>
          <div class="grid justify-center">
            <div v-show="!edit">
              <p class="font-header text-2xl font-bold py-2">Role</p>
              <div class="text-base font-medium grid justify-center py-2">
                {{ detail.role }}
              </div>
            </div>
            <div v-show="edit" class="font-bold text-lg font-header">
              Role :
              <select
                name="role"
                class="text-black p-2 rounded-lg text-lg"
                v-model="detail.role"
                required
              >
                <option v-for="role in roles">{{ role }}</option>
              </select>
            </div>
          </div>
          <!-- form -->
          <form
            method="post"
            @submit.prevent="
              $emit(
                'editDetail',
                detail.id,
                detail.Name,
                detail.Email,
                detail.Role
              );
              edit = !edit;
            "
          >
            <p class="font-header text-2xl font-bold py-2 grid justify-center">
              OnCreate
            </p>
            <div class="text-base font-medium grid justify-center py-2">
              {{
                moment(detail.createdOn)
                  .local()
                  .format("D MMMM YYYY, h:mm:ss A")
              }}
            </div>
            <p class="font-header text-2xl font-bold py-2 grid justify-center">
              OnUpdate
            </p>
            <div class="text-base font-medium grid justify-center py-2">
              {{
                moment(detail.updatedOn)
                  .local()
                  .format("D MMMM YYYY, h:mm:ss A")
              }}
            </div>
            <div class="flex justify-center ">
              <input class="btn m-2" v-show="edit" type="submit" value="OK" />
              <input
                class="btn m-2"
                v-show="edit"
                type="button"
                value="Cancel"
                @click="edit = !edit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-header {
  color: #ff9d00;
}
.modal-content {
  margin: auto;
  padding: 20px;
  width: 550px;
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
