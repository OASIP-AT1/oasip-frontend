<script setup>
import { ref, onBeforeMount, inject } from "vue";
import moment from "moment";
import Detail from "./scheduleBtn/Detail.vue";
import Delete from "../buttons/Delete.vue";
import Navbar from "./scheduleBtn/Navbar.vue";
import SortDate from "./scheduleBtn/SortDate.vue";
import Login from "../../views/LoginFirst.vue";
import TokenService from "../../services/token.js";

const schedules = ref([]);
const category = ref([]);
const refreshTokenFunction = inject("refreshTokenFunction");

setInterval(() => {
    if (!TokenService.checkLocalStorage()) {
        if (TokenService.isTokenExpired()) {
            refreshTokenFunction();
        }
    }
}, 1000);
// GET
const getSchedules = async () => {
    if (!TokenService.checkLocalStorage()) {
        const res = await fetch(import.meta.env.VITE_EVENT_URL, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: TokenService.getAccessToken(),
            },
        });
        if (res.status === 200) {
            schedules.value = await res.json();
        } else console.log("error, cannot get data");
    }
};

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
            category.value = await res.json();
        } else if (TokenService.isTokenExpired()) {
            refreshTokenFunction();
            // alert("token is expired. Please try again later.");
        } else console.log("error, cannot get data");
    }
};

onBeforeMount(async () => {
    await getSchedules(), getCategories();
});

// PUT
const modifySchedules = async (newId, newTime, newNotes, isOverlap) => {
    if (!isOverlap) {
        const res = await fetch(import.meta.env.VITE_EVENT_URL + "/" + newId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: TokenService.getAccessToken(),
            },
            body: JSON.stringify({
                eventStartTime: moment.unix(newTime).utcOffset("+07:00"),
                eventNotes: newNotes == null ? null : newNotes
            }),
        });
        if (res.status === 200) {
            const edit = await res.json();
            data.value = edit.eventNotes;
            getSchedules();
            console.log("edited successfully");
            console.log(newId, newTime, newNotes);
        } else console.log("error, cannot edit");
    }
};

const currentDetail = ref({});
const data = ref(null);

const moreDetail = (curbookingId) => {
    currentDetail.value = curbookingId;
    currentDetail.value.eventStartTime = currentDetail.value.eventStartTime;
};

const filter = ref();
const upcomingEvent = ref();
const pastEvent = ref();

const getClinic = async (id) => {
    if (id !== 0) {
        upcomingEvent.value = undefined;
        pastEvent.value = undefined;
        const res = await fetch(
            import.meta.env.VITE_CATEGORY_URL + "/" + id + "/events",
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: TokenService.getAccessToken(),
                },
            }
        );
        if (res.status === 200) {
            filter.value = await res.json();
        } else console.log("error, cannot get data");
    } else {
        filter.value = undefined;
        upcomingEvent.value = undefined;
        pastEvent.value = undefined;
    }
};

const getUpcoming = async () => {
    const res = await fetch(import.meta.env.VITE_EVENT_URL + "/upcoming", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: TokenService.getAccessToken(),
        },
    });
    if (res.status === 200) {
        filter.value = await res.json();
        upcomingEvent.value = filter.value;
        pastEvent.value = undefined;
    } else console.log("error, cannot get data");
};

const getPast = async () => {
    const res = await fetch(import.meta.env.VITE_EVENT_URL + "/past", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: TokenService.getAccessToken(),
        },
    });
    if (res.status === 200) {
        filter.value = await res.json();
        pastEvent.value = filter.value;
        upcomingEvent.value = undefined;
    } else console.log("error, cannot get data");
};

//GET
const getSortDate = async (date) => {
    const res = await fetch(
        import.meta.env.VITE_EVENT_URL + "/sort-date/" + date,
        {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: TokenService.getAccessToken(),
            },
        }
    );
    if (res.status === 200) {
        filter.value = await res.json();
    } else console.log("error, cannot get data");
};
</script>

<template>
    <Login v-if="TokenService.checkLocalStorage()" />
    <div v-else>
        <div
            id="contents-list"
            v-cloak
            class="px-10 py-5 grid justify-items-center"
        >
            <div>
                <h1 class="inline-block text-5xl font-bold py-5 pr-5 uppercase">
                    Schedules Event
                </h1>
                <SortDate @sort-date="getSortDate" />
                <input
                    class="btn btn-outline btn-color-outline mx-2 absolute mt-5"
                    type="reset"
                    value="reset"
                    @click="filter = undefined"
                />
            </div>
            <table class="table-zebra table-layout table-element">
                <thead class="table-header bg-base-200">
                    <tr>
                        <Navbar
                            @option="getClinic"
                            @upcoming="getUpcoming"
                            @past="getPast"
                            :category="category"
                        />
                    </tr>
                </thead>
                <div
                    v-if="schedules < 1 || filter < 1"
                    class="no-event text-5xl pt-20 font-normal"
                    v-cloak
                >
                    <p
                        v-if="
                            upcomingEvent == undefined && pastEvent == undefined
                        "
                    >
                        No Scheduled Events
                    </p>
                    <p v-else-if="upcomingEvent != undefined">
                        No On-Going or Upcoming Events
                    </p>
                    <p v-else>No Past Events</p>
                </div>
                <tbody class="font-light text-gray-500" v-else>
                    <template v-if="filter === undefined">
                        <tr v-for="contents in schedules" :key="contents.id">
                            <td class="p-10 text-xl">
                                <div class="box-element break-words">
                                    {{ contents.bookingName }}
                                </div>
                            </td>
                            <td class="p-10 text-xl box-element break-words">
                                <div class="pt-2">
                                    {{ contents.categoryName }}
                                </div>
                            </td>
                            <td class="p-10 text-xl box-element break-words">
                                {{
                                    moment
                                        .unix(contents.eventStartTime)
                                        .local()
                                        .format("D MMMM YYYY, h:mm:ss A")
                                }}
                            </td>

                            <td class="p-10 text-xl">
                                {{ contents.eventDuration }} minute
                            </td>

                            <td>
                                <div id="showDetail">
                                    <Detail
                                        @moreDetail="moreDetail(contents)"
                                        :detail="currentDetail"
                                        :event="schedules"
                                        @editDetail="modifySchedules"
                                    />

                                    <Delete
                                        :delete="contents.id"
                                        :content="schedules"
                                        URLname="event"
                                    />
                                </div>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="contents in filter" :key="contents">
                            <td class="p-10 text-xl">
                                <div class="box-element break-words">
                                    {{ contents.bookingName }}
                                </div>
                            </td>
                            <td class="p-10 text-xl box-element break-words">
                                <div class="pt-2">
                                    {{ contents.categoryName }}
                                </div>
                            </td>

                            <td class="p-10 text-xl box-element break-words">
                                {{
                                    moment
                                        .unix(contents.eventStartTime)
                                        .local()
                                        .format("D MMMM YYYY, h:mm:ss A")
                                }}
                            </td>

                            <td class="p-10 text-xl">
                                {{ contents.eventDuration }} minute
                            </td>

                            <td>
                                <div id="showDetail">
                                    <Detail
                                        @moreDetail="moreDetail(contents)"
                                        :detail="currentDetail"
                                        :event="schedules"
                                        @editDetail="modifySchedules"
                                    />
                                    <Delete
                                        :delete="contents.id"
                                        :content="schedules"
                                        URLname="event"
                                    />
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
.btn-color-outline {
    @apply border-transparent;
    color: #f99952;
    background-color: white;
    border-color: #f48c41;
}

.btn-color-outline:hover {
    @apply border-transparent;
    color: white;
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
.table-element {
    height: 100px;
}
.box-element {
    width: 250px;
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
