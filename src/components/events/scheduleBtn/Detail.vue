<script setup>
import moment from "moment";
import { ref, computed } from "vue";

defineEmits(["moreDetail", "editDetail"]);
const props = defineProps({
    detail: {
        type: Object,
        default: [],
    },
    description: {
        type: String,
        default: "",
    },
    event: {
        type: Array,
        default: [],
    },
});


const edit = ref(false);
const isModalOn = ref(false);

const isOverlap = ref(false);
const error = ref(false);
const overlap = () => {
    var startTime = moment(props.detail.eventStartTime).format();
    var endTime = moment(props.detail.eventStartTime)
        .add(props.detail.eventDuration, "minutes")
        .format();
    props.event.forEach((e) => {
        if (
            e.categoryId === props.detail.categoryId &&
            e.id !== props.detail.id
        ) {
            var startTime_2 = e.eventStartTime;
            var endTime_2 = moment(e.eventStartTime)
                .add(e.eventDuration, "minute")
                .format();
            if (checkOverlap(startTime, endTime, startTime_2, endTime_2)) {
                isOverlap.value = true;
                error.value = true;
                console.log("Overlap");
            }
        }
    });
};

const checkOverlap = (start_1, end_1, start_2, end_2) => {
    if (start_1 < end_2 && end_1 > start_2) return true;
    return false;
};
const files = ref(null);
const isMaxsize = ref(false);
const testFile = (event) => {
    console.log(event.target.files[0].size);
    console.log(event.target.files[0].size > 10485760);
    isMaxsize.value = false;
    if (event.target.files[0].size > 10485760) {
        isMaxsize.value = true;
        // return;
    } else {
        files.value = event.target.files;
    }
};
const AddFile = async () => {
    const formData = new FormData();
    formData.append("file", files.value[0]);

    await fetch(import.meta.env.VITE_FILE_URL, {
        method: "POST",
        body: formData,
    });
};

const clearFile = () => {
    files.value = null;
    console.log(files.value);
};

const calculateFile = (size) => {
    const fileSizeKB = size / 1024;
    if (fileSizeKB > 1024) {
        const fileSizeMB = fileSizeKB / 1024;
        return `${fileSizeMB.toFixed(2)} MB`;
    } else {
        return `${fileSizeKB.toFixed(2)} KB`;
    }
};
const currentTime = ref(null);
const dateTime = (detail) => {
    currentTime.value = moment.unix(detail).format("YYYY-MM-DDTHH:mm");
    return moment.unix(detail).local().format("D MMMM YYYY, h:mm:ss A");
};
</script>

<template>
    <button
        class="btn modal-button btn-color"
        @click="
            $emit('moreDetail', $event);
            edit = false;
            error = false;
            isModalOn = !isModalOn;
            //description = detail.eventNotes;
        "
    >
        Detail
    </button>
    <div v-show="isModalOn" class="modal-show flex justify-center">
        <div class="modal-content bg-base-100 rounded-2xl">
            <div class="flex justify-end">
                <button class="close" @click="isModalOn = !isModalOn">x</button>
            </div>
            <div class="text-2xl font-black text-[#ff9d00] uppercase mb-5">
                <h1>Event Detail</h1>
            </div>
            <form
                method="post"
                @submit.prevent="
                    $emit(
                        'editDetail',
                        detail.id,
                        detail.eventStartTime,
                        detail.eventNotes,
                        isOverlap
                    );
                    isOverlap === true ? edit : (edit = !edit);
                    isOverlap = false;
                "
            >
                <div class="grid grid-cols-2 gap-5">
                    <div class="name">
                        <p class="font-normal text-sm">Name</p>
                        <div>
                            <p class="text-black font-normal text-base">
                                {{ detail.bookingName }}
                            </p>
                        </div>
                    </div>
                    <div class="email">
                        <p class="font-normal text-sm">Email</p>
                        <div>
                            <p class="text-black font-normal text-base">
                                {{ detail.bookingEmail }}
                            </p>
                        </div>
                    </div>
                    <div class="clinic">
                        <p class="font-normal text-sm">Clinic</p>
                        <div>
                            <p class="text-black font-normal text-base">
                                {{ detail.categoryName }}
                            </p>
                        </div>
                    </div>
                    <div class="date">
                        <p class="font-normal text-sm">Date Time</p>
                        <div v-if="!edit">
                            <p class="text-black font-normal text-base">
                                {{ dateTime(detail.eventStartTime) }}
                            </p>
                        </div>
                        <div v-else>
                            <input
                                type="datetime-local"
                                v-model="currentTime"
                                :min="new Date().toISOString().slice(0, 16)"
                                step="any"
                                class="text-black rounded-md ring-black ring-1 p-2 w-full"
                                required
                            />
                        </div>
                    </div>
                    <div class="duration">
                        <p class="font-normal text-sm">Duration</p>
                        <div>
                            <p class="text-black font-normal text-base">
                                {{ detail.eventDuration }} minute
                            </p>
                        </div>
                    </div>
                    <div class="note">
                        <p class="font-normal text-sm">Note</p>
                        <div v-if="!edit">
                            <p class="text-black font-normal text-base">
                                {{
                                    detail.eventNotes != '' && detail.eventNotes != null
                                        ? detail.eventNotes.trim()
                                        : "No message"
                                }}
                            </p>
                        </div>
                        <div v-else>
                            <textarea
                                cols="50"
                                rows="3"
                                v-model.trim="detail.eventNotes"
                                class="text-black p-2 rounded-md ring-black ring-1 w-full"
                                placeholder="Maximum 500 characters"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div v-if="edit" class="mt-3">
                    <p for="File" class="font-normal text-sm my-2">
                        Attachments
                    </p>
                    <label
                        class="flex w-full justify-center items-center border-dotted border-4 py-5 rounded-lg bg-blue-100 border-blue-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-6 h-6 mr-2"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        Upload your files
                        <input type="file" @change="testFile" hidden />
                    </label>
                </div>
                <div
                    class="mt-4 p-5 px-8 rounded-md bg-[#f4f4fc] flex justify-between"
                    v-for="file in files"
                >
                    <div class="flex items-center">
                        <img
                            v-if="file.type.includes('png')"
                            class="w-10 mr-5"
                            src="../../../assets/png-file.png"
                            alt=""
                        />
                        <img
                            v-else-if="file.type.includes('jpg')"
                            class="w-10 mr-5"
                            src="../../../assets/jpg-file.png"
                            alt=""
                        />
                        <img
                            v-else-if="file.type.includes('svg')"
                            class="w-10 mr-5"
                            src="../../../assets/svg.png"
                            alt=""
                        />
                        <img
                            v-else-if="file.type.includes('pdf')"
                            class="w-10 mr-5"
                            src="../../../assets/pdf-file.png"
                            alt=""
                        />
                        <img
                            v-else-if="file.type.includes('zip')"
                            class="w-10 mr-5"
                            src="../../../assets/zip-file.png"
                            alt=""
                        />
                        <img
                            v-else-if="file.type.includes('doc')"
                            class="w-10 mr-5"
                            src="../../../assets/doc-file.png"
                            alt=""
                        />
                        <img
                            v-else
                            class="w-10 mr-5"
                            src="../../../assets/file.png"
                            alt=""
                        />
                        <div>
                            <p>
                                {{ file.name }}
                            </p>
                            <p>
                                {{ calculateFile(file.size) }}
                            </p>
                        </div>
                    </div>
                    <svg
                        @click="clearFile"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-7 h-7 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 justify-end"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <!-- <a href="C:/Users/HP/Downloads" :download="file.name">Download</a> -->
                </div>
                <div id="btn-edit" class="mt-5" v-if="!edit">
                    <button
                        @click="edit = !edit"
                        class="btn btn-color text-white w-full rounded-md"
                    >
                        Edit
                    </button>
                </div>
                <div id="btn-save" v-else class="flex justify-around mt-5">
                    <button
                        @click="overlap"
                        class="btn btn-success text-white w-1/2 rounded-md mr-2"
                    >
                        <input
                            type="submit"
                            value="SAVE"
                            class="font-bold text-sm"
                        />
                    </button>
                    <button
                        @click="edit = !edit"
                        class="btn btn-error text-white w-1/2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <!-- <div class="flex justify-center">
                <div>
                    <div class="text-3xl font-bold flex justify-center">
                        <p class="font-header">
                            {{ detail.bookingName }}
                        </p>
                        <button
                            v-show="!edit"
                            @click="edit = !edit"
                            class="pl-2"
                        >
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
                    <div class="text-base font-medium grid justify-center py-2">
                        {{ detail.bookingEmail }}
                    </div>
                    <div class="grid justify-center">
                        <p
                            class="text-lg font-bold grid justify-center py-3 opacity-50"
                        >
                            Clinic
                        </p>
                        <div class="font-header text-2xl font-bold py-2">
                            {{ detail.categoryName }}
                        </div>
                    </div>
                    <form
                        method="post"
                        @submit.prevent="
                            $emit(
                                'editDetail',
                                detail.id,
                                detail.eventStartTime,
                                description,
                                isOverlap
                            );
                            isOverlap === true ? edit : (edit = !edit);
                            isOverlap = false;
                        "
                    >
                        <div
                            v-show="!edit"
                            class="text-base font-medium grid justify-center py-2"
                        >

                            {{
                                moment(detail.eventStartTime)
                                    .local()
                                    .format("D MMMM YYYY, h:mm:ss A")
                            }}
                        </div>
                        <div
                            v-show="edit"
                            class="text-base font-medium grid justify-center py-2"
                        >
                            <input
                                type="datetime-local"
                                v-model="detail.eventStartTime"
                                :min="date"
                                step="any"
                                class="text-black p-1 rounded-md ring-black ring-1"
                                required
                            />
                            <p class="text-red-600" v-show="error">
                                Error!!! this start time is overlapped other
                                event.
                            </p>
                        </div>
                        <div
                            class="text-2xl font-bold grid justify-center py-2"
                        >
                            <div>
                                <span class="font-header">Duration : </span
                                ><span>{{ detail.eventDuration }} minutes</span>
                            </div>
                        </div>
                        <div class="grid justify-center">
                            <p
                                class="text-lg font-bold opacity-50 grid justify-center py-3"
                            >
                                Note
                            </p>
                            <div
                                v-show="!edit"
                                v-if="description.trim() != ''"
                                class="text-base font-medium py-2"
                            >
                                {{ description }}
                            </div>
                            <div
                                v-show="!edit"
                                v-else
                                class="text-base font-medium auto-fill py-2"
                            >
                                No messages
                            </div>
                            <div v-show="edit" class="py-2">
                                <textarea
                                    cols="50"
                                    rows="3"
                                    v-model="description"
                                    class="text-black p-2 rounded-lg ring-black ring-1"
                                    placeholder="Maximum 500 characters"
                                ></textarea>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <input
                                class="btn m-2 btn-error text-white"
                                v-show="edit"
                                type="button"
                                value="Cancel"
                                @click="
                                    edit = !edit;
                                    description = detail.eventNotes;
                                "
                            />
                            <input
                                class="btn m-2 btn-success text-white"
                                v-show="edit"
                                type="submit"
                                value="OK"
                                @click="overlap()"
                            />
                        </div>
                    </form>
                </div>
            </div> -->
        </div>
    </div>
</template>

<style scoped>
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
.font-header {
    color: #ff9d00;
}
.modal-content {
    margin: auto;
    padding: 30px;
    width: 600px;
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
