<script setup>
import { ref, onBeforeMount, inject } from "vue";
import CEdit from "./categoryBtn/CEdit.vue";
import Login from "../../views/LoginFirst.vue";
import TokenService from "../../services/token.js";

const categories = ref([]);

// GET
const getCategories = async () => {
    if (!TokenService.checkLocalStorage()) {
        const res = await fetch(import.meta.env.VITE_CATEGORY_URL, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                account: TokenService.checkLocalStorage()
                    ? "guest"
                    : TokenService.getEmail(),
            },
        });

        if (res.status === 200) {
            categories.value = await res.json();
            // console.log(categories.value);
        } else console.log("error, cannot get category");
    }
};

onBeforeMount(async () => {
    await getCategories();
});

// PUT
const modifyCategories = async (
    id,
    newName,
    newDesc,
    newDuration,
    isunique
) => {
    if (isunique == false) {
        const res = await fetch(import.meta.env.VITE_CATEGORY_URL + "/" + id, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                account: TokenService.checkLocalStorage()
                    ? "guest"
                    : TokenService.getEmail(),
            },
            body: JSON.stringify({
                eventCategoryName: newName,
                eventCategoryDescription:
                    newDesc == null ? null : newDesc.trim(),
                eventDuration: newDuration,
            }),
        });
        if (res.status === 200) {
            getCategories();
            console.log("edited successfully");
        } else console.log("error, cannot edit");
    }
};

const currentDetail = ref({});
const data = ref({});
const moreDetail = (curbookingId) => {
    currentDetail.value = curbookingId;
    data.value = currentDetail.value;
};

const RoletoEdit = () => {
    return TokenService.checkRole("admin") || TokenService.checkRole("lecturer")
        ? true
        : false;
};

const colors = ["#ED5564", "#FFCE54", "#A0D568", "#4FC1E8", "#AC92EB"];
</script>

<template>
    <Login v-if="TokenService.checkLocalStorage()" />
    <div v-else>
        <div class="px-6 py-12 mx-auto w-10/12">
            <div class="py-10 px-5 space-y-2">
                <h1
                    class="text-center text-5xl font-bold text-gray-900 uppercase"
                >
                    Category Event
                </h1>
            </div>
            <div class="grid grid-cols-2 gap-8 ml-40">
                <div
                    class="category-list shadow-xl rounded-lg"
                    v-for="(category, index) in categories"
                    :key="index"
                >
                    <div
                        class="text-white rounded-t-lg p-2 pl-3"
                        :style="{ 'background-color': colors[index] }"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                            />
                        </svg>
                    </div>
                    <div class="p-6 px-8">
                        <div class="flex justify-between items-center">
                            <p class="text-black font-black text-lg uppercase">
                                {{ category.eventCategoryName }}
                            </p>
                            <span
                                :style="{ 'background-color': colors[index] }"
                                class="text-white px-4 py-1 rounded-sm text-center text-sm"
                                >{{ category.eventDuration }} min</span
                            >
                        </div>

                        <p
                            class="text-gray-500 mt-2"
                            v-if="
                                category.eventCategoryDescription != null &&
                                category.eventCategoryDescription.trim() != ''
                            "
                        >
                            {{ category.eventCategoryDescription }}
                        </p>
                        <p class="text-gray-500 mt-2" v-else>No Description</p>
                        <!-- <CEdit
                                    v-if="RoletoEdit()"
                                    @moreDetail="moreDetail(contents)"
                                    :detail="currentDetail"
                                    :name="currentDetail.eventCategoryName"
                                    :description="
                                        currentDetail.eventCategoryDescription
                                    "
                                    :duration="currentDetail.eventDuration"
                                    :category="categories"
                                    @editDetail="modifyCategories"
                                /> -->
                        <label for="my-modal-6" class="btn btn-color mt-5" @click="moreDetail(category)">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 mr-1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                            Edit
                        </label>
                    </div>
                </div>
            </div>
                <CEdit
                    v-if="RoletoEdit"
                    :detail="currentDetail"
                    :name="currentDetail.eventCategoryName"
                    :description="currentDetail.eventCategoryDescription"
                    :duration="currentDetail.eventDuration"
                    :category="categories"
                    @editDetail="modifyCategories"
                />
        </div>
        <!-- <div
            id="contents-list"
            v-cloak
            class="px-10 py-5 grid justify-items-center"
        >
            <h1 class="inline-block text-5xl font-medium py-5">
                Category Event
            </h1>
            <table class="table-zebra table-layout table-element">
                <thead class="table-header bg-base-100">
                    <tr>
                        <th class="text-xl font-extrabold px-10">CATEGORY</th>
                        <th class="text-xl font-extrabold px-10">
                            DESCRIPTION
                        </th>
                        <th class="text-xl font-extrabold px-10">DURATION</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contents in categories" :key="contents.id">
                        <td class="p-10 text-xl">
                            <div class="box-element break-words">
                                {{ contents.eventCategoryName }}
                            </div>
                        </td>
                        <td class="p-10 text-xl">
                            <div
                                v-if="
                                    contents.eventCategoryDescription != null &&
                                    contents.eventCategoryDescription.trim() !=
                                        ''
                                "
                                class="pt-2 box-element break-word"
                            >
                                {{ contents.eventCategoryDescription }}
                            </div>
                            <div
                                v-else-if="
                                    typeof contents.eventCategoryDescription
                                "
                                class="auto-fill text-xl font-medium"
                            >
                                No message
                            </div>
                        </td>
                        <td class="p-10 text-xl">
                            {{ contents.eventDuration }} minute
                        </td>

                        <td>
                            <div id="showDetail">
                                <CEdit
                                    v-if="RoletoEdit()"
                                    @moreDetail="moreDetail(contents)"
                                    :detail="currentDetail"
                                    :name="currentDetail.eventCategoryName"
                                    :description="
                                        currentDetail.eventCategoryDescription
                                    "
                                    :duration="currentDetail.eventDuration"
                                    :category="categories"
                                    @editDetail="modifyCategories"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}

.modals {
    /* position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(73, 73, 73, 0.4); */
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
.auto-fill {
    color: #8f8f8f;
}

.category-list {
    width: 80%;
    scale: 1;
}

.category-list:hover {
    transform: scale(1.1);
    transition: all 0.1s ease-in-out;
}

.btn-color {
    @apply border-transparent;
    color: white;
    background-color: #f99952;
    /* background-color: #282424; */
}

.btn-color:hover {
    @apply border-transparent;
    color: rgb(211, 209, 209);
    /* color: white; */
    /* background-color: #808080 */
    background-color: #f48c41;
}
</style>
