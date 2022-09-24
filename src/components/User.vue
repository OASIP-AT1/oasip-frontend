<script setup>
import UNavbar from "./buttons/userBtn/UNavbar.vue";
import UCreate from "./buttons/userBtn/UCreate.vue";
import UDetail from "./buttons/userBtn/UDetail.vue";
import UDelete from "./buttons/userBtn/UDelete.vue";
import Login from "./buttons/Login.vue";
import SignOut from "./buttons/SignOut.vue";

import { ref, onBeforeMount } from "vue";

const props = defineProps({
  token: {
    type: String,
    require: true,
  },
});

const users = ref([]);
// GET
const getUsers = async () => {
  const res = await fetch(import.meta.env.VITE_USER_URL);
  if (res.status === 200) {
    users.value = await res.json();
  } else console.log("error, cannot get data");
};
onBeforeMount(async () => {
  await getUsers();
});

// POST
const createNewUsers = async (Name, Email, Role, Password, isunique, error) => {
  if (Name.trim() != "" && isunique == false && error == false) {
    const res = await fetch(import.meta.env.VITE_USER_URL, {
      // const res = await fetch("http://localhost:5001/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: Name.trim(),
        email: Email.trim(),
        role: Role,
        password: Password,
      }),
    });
    if (res.status === 201) {
      getUsers();
    } else console.log("error, cannot be added");
  }
};

// DELETE
const removeUsers = async (removeContentID) => {
  if (confirm("Do you really want to delete")) {
    const res = await fetch(
      import.meta.env.VITE_USER_URL + "/" + removeContentID,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      users.value = users.value.filter((users) => users.id !== removeContentID);
      console.log("deleted successfullly");
    } else console.log("error, cannot delete");
  }
};

// PUT
const modifyUser = async (newId, newName, newEmail, newRole, isunique) => {
  if (isunique == false) {
    const res = await fetch(import.meta.env.VITE_USER_URL + "/" + newId, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
        role: newRole,
      }),
    });
    if (res.status === 200) {
      getUsers();
      console.log("edited successfully");
    } else console.log("error, cannot edit");
    console.log(newRole, newName, newEmail);
  }
};

const currentDetail = ref({});

const moreDetail = (curUserId) => {
  currentDetail.value = curUserId;
  getUsers();
};
</script>

<template>
  <Login />
  <sign-out />
  <div id="contents-list" v-cloak class="px-10 py-5 flex justify-center">
    <table class="table-zebra table-layout table-element">
      <thead class="table-header bg-base-200">
        <tr>
          <UNavbar />
          <th>
            <UCreate @create="createNewUsers" :users="users" />
          </th>
        </tr>
      </thead>
      <div>
        <img
          class="center mt-14"
          src="https://previews.123rf.com/images/limbi007/limbi0071301/limbi007130100033/17259439-orange-cartoon-character-with-green-button-login-.jpg"
          alt=""
        />
        <p class="center text-center font-extrabold tracking-wider text-xl py-5">PLEASE LOGIN FIRST</p>
        <button></button>
      </div>
      <!-- <div class="no-event text-5xl pt-20" v-if="users.length < 1" v-cloak>
        No Users
      </div>
      <tbody v-else>
        <tr v-for="contents in users" :key="contents">
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.name }}
            </div>
          </td>
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.email }}
            </div>
          </td>
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.role }}
            </div>
          </td>
          <td>
            <div>
              <UDetail
                @moreDetail="moreDetail(contents)"
                :detail="currentDetail"
                :users="users"
                @editDetail="modifyUser"
              />
              <UDelete @delete="removeUsers(contents.id)" />
            </div>
          </td>
        </tr>
      </tbody> -->
    </table>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

.center{
  display: block;
  width: 80%;
  margin-left: 150%;
}
.no-event {
  text-align: center;
  width: 100%;
  position: absolute;
  z-index: -1;
}

table {
  text-align: left;
  position: relative;
  border-collapse: collapse;
  border-radius: 6px;
}

input,
textarea {
  color: rgb(0 0 0);
}

.table-header {
  position: sticky;
  top: 0;
  height: 100px;
}
.table-layout {
  table-layout: fixed;
  width: 90%;
}
.box-element {
  width: 250px;
}
.table-element {
  height: 100px;
}
.modal-content {
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: 300px;
}
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 300px;
  left: 0;
  top: 0;
  width: 100%;
  height: 600px;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
