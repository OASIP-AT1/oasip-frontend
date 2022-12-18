<script setup>
import { ref } from "vue";
import TokenService from "../../../services/token.js";

defineEmits(["moreDetail", "editDetail"]);
const props = defineProps({
    detail: {
        type: Object,
        require: true,
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    duration: {
        type: Number,
        require: true,
    },
});

const isModalOn = ref(false);
const isunique = ref(false);
const error = ref(false);

const unique = (name, id) => {
    props.category.forEach((e) => {
        if (id != e.id) {
            if (e.eventCategoryName == name) {
                isunique.value = true;
                error.value = true;
            }
        }
    });
};


const reset = () => {

    isunique.value = false;
    error.value = false;
};

</script>

<template>
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <div class="modal bg-[#49494966] modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="font-bold text-2xl uppercase text-[#ff9d00]">
                Edit Category
            </h3>
            <form
                method="post"
                @submit.prevent="
                    $emit(
                        'editDetail',
                        detail.id,
                        name,
                        description,
                        duration,
                        isunique
                    );
                    isunique = false;
                "
            >
                <div class="flex space-x-8">
                    <div>
                        <p class="pt-4 pb-2">
                            Category Name
                            <span class="text-gray-500"
                                >({{
                                    name != undefined ? name.length : 0
                                }}/100)</span
                            >
                        </p>
                        <input
                            type="text"
                            v-model="name"
                            class="font-light p-1 m-1 rounded-md ring-black border-b-2 text-gray-500"
                            maxlength="100"
                            required
                        />
                        <p class="text-red-600" v-show="error">
                            Error!!! CategoryName must be unique!!!
                        </p>
                    </div>
                    <div>
                        <p class="pt-4 pb-2">Duration</p>
                        <input
                            type="number"
                            class="text-gray-500 p-1 m-1 rounded-md ring-black border-b-2 font-light"
                            v-model="duration"
                            required
                        />
                    </div>
                </div>
                <div>
                    <div class="mt-5">
                        <p>
                            Note
                            <span class="text-gray-500"
                                >({{
                                    description != undefined
                                        ? description.length
                                        : 0
                                }}/500)</span
                            >
                        </p>
                        <textarea
                            cols="30"
                            rows="3"
                            placeholder="Description"
                            v-model="description"
                            class="text-gray-500 font-light p-1 m-1 rounded-md ring-black border-b-2 w-full"
                        ></textarea>
                    </div>
                </div>
                <div class="modal-action">
                    <label
                        class="btn btn-success text-white hover:bg-green-500 w-1/2"
                    >
                        <input
                            @click="unique(name, detail.id)"
                            type="submit"
                            value="Save"
                            class="uppercase font-bold text-sm"
                    /></label>
                    <label
                        @click="reset"
                        for="my-modal-6"
                        class="btn btn-error text-white hover:bg-red-500 w-1/2"
                        >cancel</label
                    >
                </div>
            </form>
        </div>
    </div>
    <!-- <button
        class="btn modal-button btn-color"
        @click="
            $emit('moreDetail');
            isModalOn = !isModalOn;
            error = false;
            name = detail.eventCategoryName;
            description = detail.eventCategoryDescription;
            duration = detail.eventDuration;
        "
    >
        EDIT
    </button>
    <div v-show="isModalOn" class="modal-show flex justify-center">
        <div class="modal-content bg-base-100 rounded-2xl">
            <div class="flex justify-end">
                <button class="close" @click="isModalOn = !isModalOn">x</button>
            </div>
            <div class="flex justify-center">
                <div>
                    <form
                        method="post"
                        @submit.prevent="
                            $emit(
                                'editDetail',
                                detail.id,
                                name,
                                description,
                                duration,
                                isunique
                            );
                            isunique == true
                                ? isModalOn
                                : (isModalOn = !isModalOn);
                            isunique = false;
                        "
                    >
                        <div
                            v-show="isModalOn"
                            class="text-base font-medium grid justify-center py-2"
                        >
                            <p
                                class="grid justify-center font-bold text-4xl mb-4 font-header"
                            >
                                Category Name
                            </p>
                            <input
                                type="text"
                                v-model="name"
                                class="text-black p-1 m-1 rounded-md ring-black ring-1"
                                maxlength="100"
                                required
                            />
                            <p class="text-red-600" v-show="error">
                                Error!!! CategoryName must be unique!!!
                            </p>
                        </div>
                        <div
                            class="text-base font-medium grid justify-center py-2"
                        >
                            <div v-show="isModalOn">
                                <p
                                    class="grid justify-center font-bold text-2xl mb-4 font-header"
                                >
                                    Description
                                </p>
                                <textarea
                                    cols="60"
                                    rows="4"
                                    maxlength="500"
                                    v-model="description"
                                    class="text-black p-2 m-1 rounded-md ring-black ring-1"
                                    placeholder="Maximum 500 characters"
                                ></textarea>
                            </div>
                        </div>
                        <div
                            class="text-lg font-medium grid justify-center py-2"
                        >
                            <p>
                                Duration :
                                <input
                                    type="number"
                                    min="1"
                                    max="480"
                                    v-model="duration"
                                    class="text-black p-1 m-1 rounded-md ring-black ring-1"
                                    required
                                />
                                <span>min: 1 | max: 480</span>
                            </p>
                        </div>
                        <div class="flex justify-end">
                            <input
                                class="btn m-2 btn-error text-white"
                                v-show="isModalOn"
                                type="button"
                                value="Cancel"
                                @click="isModalOn = !isModalOn"
                            />
                            <input
                                class="btn m-2 btn-success text-white"
                                v-show="isModalOn"
                                type="submit"
                                value="OK"
                                @click="unique(name, detail.id)"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> -->
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
.auto-fill {
    color: #8f8f8f;
}
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
</style>
