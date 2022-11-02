<script setup>
import UNavbar from "./userBtn/UNavbar.vue";
import UDetail from "./userBtn/UDetail.vue";
import UDelete from "../buttons/Delete.vue";
import Login from "../../views/LoginFirst.vue";
import PermissionPage from "../../views/PermissionPage.vue";
import { ref, onBeforeMount, inject, computed } from "vue";
import { useRouter } from "vue-router";
import TokenService from "../../services/token.js";

const appRouter = useRouter();
const signUpRouter = () => appRouter.push({ name: "signUpContents" });
const users = ref([]);
const refreshTokenFunction = inject("refreshTokenFunction");

// GET
const getUsers = async () => {
    if (!TokenService.checkLocalStorage()) {
        const res = await fetch(import.meta.env.VITE_USER_URL, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: TokenService.getAccessToken(),
            },
        });
        if (res.status === 200) {
            users.value = await res.json();
        } 
        else console.log("error, cannot get use");
    }
};
onBeforeMount(async () => {
    await getUsers();
});


// PUT
const modifyUser = async (newId, newName, newEmail, newRole, isunique) => {
    if (isunique == false) {
        const res = await fetch(import.meta.env.VITE_USER_URL + "/" + newId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: TokenService.getAccessToken(),
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
};
</script>

<template>
    <Login v-if="TokenService.checkLocalStorage()"/>
    <PermissionPage v-else-if="!TokenService.checkRole('admin')" />
    <div v-else>
        <div
            id="contents-list"
            v-cloak
            class="px-10 py-5 grid justify-items-center"
        >
            <h1 class="inline-block text-5xl font-medium py-5">Users Event</h1>
            <table class="table-zebra table-layout table-element">
                <thead class="table-header bg-base-200">
                    <tr>
                        <UNavbar />
                        <th>
                            <button
                                class="btn btn-color text-xl font-extrabold px-10 mr-5"
                                @click.left="signUpRouter"
                            >
                                CREATE
                            </button>
                        </th>
                    </tr>
                </thead>
                <div class="no-event text-5xl pt-20" v-if="users.length < 1">
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
                                <UDelete
                                    :delete="contents.id"
                                    :content="users"
                                    :URLname="'user'"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
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
