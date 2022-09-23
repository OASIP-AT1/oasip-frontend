<script setup>
import { ref } from "vue";
defineEmits(["create"]);
const props = defineProps({
    users: {
        type: Array,
        require: true,
    },
});

const isModalOn = ref(false);
const Name = ref("");
const Email = ref("");
const option = ref();
const roles = ["student", "lecturer", "admin"];
const Password = ref("");
const Conpass = ref("");
const error = ref(false);

const empty = (name) => {
    if (name.trim() == "") {
        error.value = true;
    } else {
        error.value = false;
    }
};

const isunique = ref(false);
const Nerror = ref(false);

const uniquename = (name) => {
    props.users.forEach((e) => {
        if (e.name.toLowerCase() == name.trim().toLowerCase()) {
            isunique.value = true;
            Nerror.value = true;
        }
    });
};
const Eerror = ref(false);
const uniqueemail = (email) => {
    props.users.forEach((e) => {
        if (e.email.toLowerCase() == email.trim().toLowerCase()) {
            isunique.value = true;
            Eerror.value = true;
        }
    });
};

const errorpass = ref(false);
const confirmPass = (pass, conpass) => {
    if (pass !== conpass) {
        errorpass.value = true;
    }
};

const showpassword = ref(false);
const togglepassword = () => {
    showpassword.value = !showpassword.value;
};
const showpassword2 = ref(false);
const togglepassword2 = () => {
    showpassword2.value = !showpassword2.value;
};
</script>

<template>
    <div id="create">
        <div class="grid justify-center">
            <p class="text-5xl py-5 font-black grid justify-start">SIGN UP</p>
            <form
                class="text-black grid justify-center"
                method="post"
                @submit.prevent="
                    $emit(
                        'create',
                        Name,
                        Email,
                        option,
                        Password,
                        isunique,
                        errorpass
                    );
                    error == true
                        ? isModalOn
                        : isunique == true
                        ? isModalOn
                        : errorpass == true
                        ? isModalOn
                        : (isModalOn = !isModalOn);
                    isunique = false;
                "
            >
                <label for="Name"
                    >Name
                    <span class="auto-fill"
                        >({{ Name.length }}/100)</span
                    ></label
                >
                <input
                    type="text"
                    placeholder="name"
                    maxlength="100"
                    v-model="Name"
                    class="input input-md border-slate-400 w-96 max-w-xs bg-white mb-5"
                    required
                />
                <p class="text-red-600" v-show="Nerror">
                    This name is already in use!!!
                </p>
                <label for="Email"
                    >Email
                    <span class="auto-fill"
                        >({{ Email.length }}/50)</span
                    ></label
                >
                <input
                    type="email"
                    placeholder="email"
                    maxlength="50"
                    v-model="Email"
                    class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                    required
                />
                <p class="text-red-600" v-show="Eerror">
                    Email can not be empty!!!
                </p>
                <label for="role">Role</label>
                <div class="py-3">
                    <select
                        name="roles"
                        class="input input-md border-slate-400 w-96 max-w-xs bg-white mb-5"
                        v-model="option"
                        required
                    >
                        <option v-for="role in roles">
                            {{ role }}
                        </option>
                    </select>
                </div>
                <label for="Password"
                    >Password
                    <span class="auto-fill"
                        >({{ Password.length }}/8-14)</span
                    ></label
                >
                <input
                    type="password"
                    placeholder="password"
                    v-model="Password"
                    minlength="8"
                    maxlength="14"
                    class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                    required
                />
                <label for="ConfirmPassword"
                    >Confirm Password
                    <span class="auto-fill"
                        >({{ Conpass.length }}/8-14)</span
                    ></label
                >
                <input
                    type="password"
                    placeholder="Confirm password"
                    v-model="Conpass"
                    minlength="8"
                    maxlength="14"
                    class="input input-md border-slate-400 w-full max-w-xs bg-white mb-3"
                    required
                />

                <div class="pt-2">
                    <input
                        class="justify-start btn btn-color border-transparent"
                        type="reset"
                        value="Reset"
                    />
                    <!-- Create -->
                    <input
                        class="float-right justify-end btn btn-color border-transparent"
                        type="submit"
                        value="Create"
                        @click="
                            empty(Name);
                            uniquename(Name);
                            uniqueemail(Email);
                            confirmPass(Password, Conpass);
                        "
                    />
                </div>
            </form>
        </div>

        <!-- <button
            class="btn text-xl font-extrabold px-10"
            @click="
                Name = '';
                Email = '';
                option = undefined;
                Password = '';
                Conpass = '';
                error = false;
                Nerror = false;
                Eerror = false;
                isunique = false;
                showpassword = true;
                showpassword2 = true;
                isModalOn = !isModalOn;
            "
        >
            CREATE
            </button> -->
    </div>
</template>

<style>
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
.form-password {
    border-color: #494a7d;
    border-width: 2px;
    padding: 10px;
    border-top-left-radius: 0.375rem; /* 6px */
    border-bottom-left-radius: 0.375rem; /* 6px */
}
.form-eye {
    border-color: #494a7d;
    padding: 8px;
    border-width: 2px;
    border-top-right-radius: 0.375rem; /* 6px */
    border-bottom-right-radius: 0.375rem; /* 6px */
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
    padding: 20px;
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
