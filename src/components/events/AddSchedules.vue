<script setup>
import { ref, onBeforeMount, inject } from "vue";
import moment from "moment";
import TokenService from "../../services/token.js";

const isModalOn = ref(false);
const Name = ref("");
const Email = ref("");
const Selected = ref();
const Time = ref();
const Duration = ref();
const Notes = ref("");
const selectedId = ref();
const isOverlap = ref(false);
const error = ref(false);
const errorname = ref(false);
const categories = ref([]);
const refreshTokenFunction = inject("refreshTokenFunction");

const checkEmail = () => {
    if (!TokenService.checkLocalStorage()) {
        Email.value = TokenService.getEmail();
    }
    return Email.value;
};
checkEmail();

const checkform = () => {
    if (
        Name.value == "" ||
        Email.value == "" ||
        Selected.value == undefined ||
        Time.value == undefined ||
        isOverlap.value == true
    ) {
        isModalOn.value;
    } else {
        isModalOn.value = !isModalOn.value;
    }
    isOverlap.value = false;
};

// GET
const getCategories = async () => {
        const res = await fetch(import.meta.env.VITE_CATEGORY_URL, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.status === 200) {
            categories.value = await res.json();
        } else if (TokenService.isTokenExpired()) {
            refreshTokenFunction();
            // alert("token is expired. Please try again later.");
        } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
    await getCategories();
});

// POST
const AddNewSchedules = async (
    Name,
    Email,
    selectedId,
    Time,
    Duration,
    Notes
) => {
    if (isOverlap.value || Name == "") {
    } else {
        const res = await fetch(import.meta.env.VITE_EVENT_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: TokenService.checkLocalStorage() ? null : TokenService.getAccessToken(),
            },
            body: JSON.stringify({
                bookingName: Name,
                bookingEmail: Email,
                categoryId: selectedId,
                eventStartTime: moment(Time).utcOffset("+07:00"),
                eventDuration: Duration,
                eventNotes: Notes == "" ? null : Notes,
            }),
        });
        if (res.status === 201) {
            getSchedules();
        } else console.log("error, cannot be added");
    }
};

const overlap = () => {
    var startTime = moment(Time.value).format();
    var endTime = moment(Time.value).add(Duration.value, "minutes").format();
    categories.value.forEach((e) => {
        if (e.categoryId === selectedId.value) {
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
    if (start_1 <= start_2 && start_2 <= end_1) return true;
    if (start_1 <= end_2 && end_2 <= end_1) return true;
    if (start_2 < start_1 && end_1 < end_2) return true;
    return false;
};

const newDuration = () => {
    categories.value.forEach((category) => {
        if (category.eventCategoryName === Selected.value) {
            Duration.value = category.eventDuration;
            selectedId.value = category.id;
        }
    });
};

const date = ref();
function updateTime() {
    date.value = moment().format("YYYY-MM-DDTHH:mm:ss");
}
const realTime = () => {
    setInterval(updateTime, 1000);
};
realTime();

const empty = (name) => {
    if (name == "") {
        errorname.value = true;
        isOverlap.value = true;
    } else {
        errorname.value = false;
    }
};

const reset = () => {
    Name.value = "";
    Email.value = "";
    Selected.value = undefined;
    Time.value = undefined;
    Duration.value = undefined;
    Notes.value = "";
    error.value = false;
    errorname.value = false;
};
</script>

<template>
    <div id="create">
        <!-- form -->
        <p class="text-4xl py-3 font-black grid justify-start">ADD SCHEDULE</p>
        <form
            method="post"
            @submit.prevent="
                AddNewSchedules(Name, Email, selectedId, Time, Duration, Notes);
                checkform();
            "
        >
            <!-- Name -->
            <div class="grid justify-center">
                <label for="name"
                    >Name
                    <span class="auto-fill"
                        >({{ Name.length }}/100)</span
                    ></label
                >
                <div class="py-2">
                    <input
                        type="text"
                        v-model.trim="Name"
                        maxlength="100"
                        class="input input-md border-slate-400 w-full max-w-xs bg-white"
                        placeholder="Your name"
                        required
                    />
                    <p class="text-red-600" v-show="errorname">
                        Please fill your name
                    </p>
                </div>
                <!-- Email -->
                <label for="Email"
                    >Email
                    <span class="auto-fill"
                        >({{ Email.length }}/50)</span
                    ></label
                >
                <div class="py-2">
                    <input
                        v-if="TokenService.checkLocalStorage()"
                        type="email"
                        v-model.trim="Email"
                        maxlength="50"
                        class="input input-md border-slate-400 w-full max-w-xs bg-white"
                        placeholder="Your email"
                        required
                    />
                    <input
                        v-else-if="!TokenService.checkLocalStorage()"
                        type="email"
                        v-model.trim="Email"
                        maxlength="50"
                        class="input input-md border-slate-400 w-full max-w-xs bg-slate-100"
                        placeholder="Your email"
                        readonly
                        required
                    />
                </div>
                <!-- Clinic -->
                <label for="clinics">Clinic</label>
                <div class="py-2">
                    <select
                        name="clinics"
                        class="input input-md border-slate-400 w-full max-w-xs bg-white"
                        @change="newDuration"
                        v-model="Selected"
                        required
                    >
                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.eventCategoryName"
                        >
                            {{ category.eventCategoryName }}
                        </option>
                    </select>
                </div>
                <!-- Date -->
                <label for="Date">Date</label>
                <div class="py-2">
                    <input
                        type="datetime-local"
                        v-model="Time"
                        :min="date"
                        step="any"
                        class="input input-md border-slate-400 w-full max-w-xs bg-white"
                        required
                    />
                    <p class="text-red-600" v-show="eggirror">
                        Error!!! this start time is overlapped other event.
                    </p>
                </div>
                <!-- Duration -->
                <label for="Duration">Duration (minutes)</label>
                <div class="py-2">
                    <input
                        class="input input-md border-slate-400 w-full max-w-xs bg-slate-100"
                        readonly
                        type="text"
                        v-model="Duration"
                        placeholder="Select your clinic"
                    />
                </div>
                <!-- Note -->
                <label for="Note"
                    >Note <span class="auto-fill">(optional )</span></label
                >
                <div class="py-2">
                    <textarea
                        cols="50"
                        rows="2"
                        v-model.trim="Notes"
                        maxlength="500"
                        class="textarea border-slate-400 w-full max-w-xs bg-white"
                        placeholder="Maximum 500 characters"
                    ></textarea>
                </div>
            </div>

            <div class="pt-2">
                <input
                    class="justify-start btn btn-color border-transparent"
                    type="reset"
                    value="Reset"
                    @click="reset()"
                />
                <!-- Create -->
                <input
                    class="float-right justify-end btn btn-color border-transparent"
                    type="submit"
                    value="Create"
                    @click="
                        overlap();
                        empty(Name);
                    "
                />
            </div>
        </form>
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
    padding: 10px;
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
