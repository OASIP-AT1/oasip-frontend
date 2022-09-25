<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
defineEmits(["option"]);

const schedules = ref([]);
const appRouter = useRouter();

// GET
const getSchedules = async () => {
  const res = await fetch(import.meta.env.VITE_EVENT_URL);
  if (res.status === 200) {
    schedules.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
  await getSchedules();
});

const scheduleRouter = () => appRouter.push({ name: "scheduleContents" });
const categoryRouter = () => appRouter.push({ name: "categoryContents" });
const userRouter = () => appRouter.push({ name: "userContents" });
</script>

<template>
  <th class="text-xl font-extrabold px-10">CATEGORY</th>
  <th class="text-xl font-extrabold px-10">DESCRIPTION</th>
  <th class="text-xl font-extrabold px-10">DURATION</th>
</template>

<style scoped>
.arrow {
  border: solid black;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 3px;
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
