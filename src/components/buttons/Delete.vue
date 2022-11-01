<script setup>
import { ref } from "vue";
import TokenService from '../../services/token.js';
defineEmits(["data"]);
const props = defineProps({
  delete: {
    type: Number,
    default : 0,
  },
  content : {
    type: Array,
    required: true,
  },
  URLname : {
    type: String,
    required: true,
  }
});

const contents = ref(props.content)

const eventURL = (event) => {
    if(event === "event") {
        return import.meta.env.VITE_EVENT_URL
    }else if(event === "user") {
        return import.meta.env.VITE_USER_URL
    }
}

//DELETE
const removeContent = async (event,removeContentID) => {
  if (confirm("Do you really want to delete")) {
    const res = await fetch(
      eventURL(event) + "/" + removeContentID,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: TokenService.getAccessToken(),
        },
      }
    );
    if (res.status === 200) {
        location.reload();
        contents.value = contents.value.filter(
        (contents) => contents.id !== removeContentID
      );
      console.log("deleted successfullly");
    } else console.log("error, cannot delete");
  }
};
</script>

<template>
    <button class="m-2 w-10 p-3 del">
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            @click="removeContent(props.URLname,props.delete)" 
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
        </svg>
    </button>
</template>

<style scoped>
.del:hover {
  color: #dc3545;
}
</style>
