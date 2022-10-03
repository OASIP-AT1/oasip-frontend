<script setup>
import { ref, onBeforeMount } from "vue";
import moment from "moment";
import Detail from "./buttons/scheduleBtn/Detail.vue";
import Delete from "./buttons/Delete.vue";
import Navbar from "./buttons/scheduleBtn/Navbar.vue";
import SortDate from "./buttons/scheduleBtn/SortDate.vue";
import Login from "./LoginFirst.vue";
import Create from "./buttons/scheduleBtn/Create.vue";

const schedules = ref([]);
let token = localStorage.getItem("token");

// GET
const getSchedules = async () => {
  const res = await fetch(import.meta.env.VITE_EVENT_URL, {
    method: "GET",
    headers: { 
      "content-type": "application/json",
      "Authorization": token.toString(),
    }
  });
  if (res.status === 200) {
    schedules.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
  await getSchedules();
});

//DELETE
const removeSchedules = async (removeContentID) => {
  if (confirm("Do you really want to delete")) {
    const res = await fetch(
      import.meta.env.VITE_EVENT_URL + "/" + removeContentID,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      schedules.value = schedules.value.filter(
        (schedules) => schedules.id !== removeContentID
      );
      console.log("deleted successfullly");
    } else console.log("error, cannot delete");
  }
};

// PUT
const modifySchedules = async (newId, newTime, newNotes, isOverlap) => {
  if (isOverlap) {
  } else {
    const res = await fetch(import.meta.env.VITE_EVENT_URL + "/" + newId, {
      method: "PUT",
      headers: {
        "content-type": "application/json",

      },
      body: JSON.stringify({
        eventStartTime: moment(newTime).utcOffset("+07:00"),
        eventNotes: newNotes == null ? null : newNotes.trim(),
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

// POST
const createNewSchedules = async (
  Name,
  Email,
  selectedId,
  Time,
  Duration,
  Notes,
  isOverlap
) => {
  console.log(isOverlap);
  if (isOverlap || Name.trim() == "") {
  } else {
    const res = await fetch(import.meta.env.VITE_EVENT_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bookingName: Name,
        bookingEmail: Email,
        categoryId: selectedId,
        eventStartTime: moment(Time).utcOffset("+07:00"),
        eventDuration: Duration,
        eventNotes: Notes.trim() == "" ? null : Notes.trim(),
      }),
    });
    if (res.status === 201) {
      getSchedules();
    } else console.log("error, cannot be added");
  }
};

const currentDetail = ref({});
const data = ref("");

const moreDetail = (curbookingId) => {
  currentDetail.value = curbookingId;
  data.value = curbookingId.eventNotes;
  currentDetail.value.eventStartTime = moment(
    currentDetail.value.eventStartTime
  ).format("YYYY-MM-DDTHH:mm:ss");
  getSchedules();
};

const filter = ref();
const upcomingEvent = ref();
const pastEvent = ref();

const getClinic = async (id) => {
  if (id !== 0) {
    upcomingEvent.value = undefined;
    pastEvent.value = undefined;
    const res = await fetch(
      import.meta.env.VITE_CATEGORY_URL + "/" + id + "/events"
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
  const res = await fetch(import.meta.env.VITE_EVENT_URL + "/upcoming");
  if (res.status === 200) {
    filter.value = await res.json();
    upcomingEvent.value = filter.value;
    pastEvent.value = undefined;
  } else console.log("error, cannot get data");
};

const getPast = async () => {
  const res = await fetch(import.meta.env.VITE_EVENT_URL + "/past");
  if (res.status === 200) {
    filter.value = await res.json();
    pastEvent.value = filter.value;
    upcomingEvent.value = undefined;
  } else console.log("error, cannot get data");
};

//GET
const getSortDate = async (date) => {
  const res = await fetch(
    import.meta.env.VITE_EVENT_URL + "/sort-date/" + date
  );
  if (res.status === 200) {
    filter.value = await res.json();
  } else console.log("error, cannot get data");
};
</script>

<template>
  <Login v-if="token == null" />
  <div v-else>
    <div
      id="contents-list"
      v-cloak
      class="px-10 py-5 grid justify-items-center"
    >
      <div>
        <h1 class="inline-block text-5xl font-medium py-5 pr-5">
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
            />
            <th>
              <Create class="mr-5" :detail="schedules" @create="createNewSchedules" />
            </th>
          </tr>
        </thead>
        <div
          v-if="schedules < 1 || filter < 1"
          class="no-event text-5xl pt-20"
          v-cloak
        >
          <p v-if="upcomingEvent == undefined && pastEvent == undefined">
            No Scheduled Events
          </p>
          <p v-else-if="upcomingEvent != undefined">
            No On-Going or Upcoming Events
          </p>
          <p v-else>No Past Events</p>
        </div>
        <tbody v-else>
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
                  moment(contents.eventStartTime)
                    .local()
                    .format("D MMMM YYYY, h:mm:ss A")
                }}
              </td>

              <td class="p-10 text-xl">{{ contents.eventDuration }} minute</td>

              <td>
                <div id="showDetail">
                  <Detail
                    @moreDetail="moreDetail(contents)"
                    :detail="currentDetail"
                    :data="data"
                    :event="schedules"
                    @editDetail="modifySchedules"
                  />

                  <Delete @delete="removeSchedules(contents.id)" />
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
                  moment(contents.eventStartTime)
                    .local()
                    .format("D MMMM YYYY, h:mm:ss A")
                }}
              </td>

              <td class="p-10 text-xl">{{ contents.eventDuration }} minute</td>

              <td>
                <div id="showDetail">
                  <Detail
                    @moreDetail="moreDetail(contents)"
                    :detail="currentDetail"
                    :data="data"
                    @editDetail="modifySchedules"
                  />
                  <Delete @delete="removeSchedules(contents.id)" />
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
