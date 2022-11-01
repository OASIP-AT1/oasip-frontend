<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TokenService from "../services/token.js";

const appRouter = useRouter();
const homeRouter = () => appRouter.push({ name: "homeContents" });
const scheduleRouter = () => appRouter.push({ name: "scheduleContents" });
const categoryRouter = () => appRouter.push({ name: "categoryContents" });
const userRouter = () => appRouter.push({ name: "userContents" });
const loginRouter = () => appRouter.push({ name: "loginContents" });
const signUpRouter = () => appRouter.push({ name: "signUpContents" });
const AddEventRouter = () => appRouter.push({ name: "AddScheduleContents" });

const reloadPage = () => {
    TokenService.clearToken();
    location.replace("/");
};

const roles = ["admin", "lecturer", "student"];
const isReadmore = ref(true);
const toggleReadmore = () => {
    isReadmore.value = !isReadmore.value;
};

// const sliceEmail = () => {
//     return isReadmore.value
//         ? TokenService.getEmail().slice(0, 10)
//         : TokenService.getEmail();
// };
</script>

<template>
    <nav class="navbar text-white">
        <ul class="navbar-nav">
            <li class="logo" @click.left="homeRouter">
                <a href="#" class="nav-link">
                    <span class="link-text logo-text ml-4 font-black"
                        >OASIP-AT1
                    </span>
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fad"
                        data-icon="angle-double-right"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                    >
                        <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                class="fa-secondary"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                class="fa-primary"
                            ></path>
                        </g>
                    </svg>
                </a>
            </li>
            <li class="nav-item" @click.left="scheduleRouter">
                <a href="#" class="nav-link">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fad"
                        data-icon="schedule"
                        role="img"
                        viewBox="0 0 448 512"
                        class=""
                    >
                        <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                                class="fa-secondary"
                            ></path>
                        </g>
                    </svg>
                    <span class="link-text font-black">Schedule</span>
                </a>
            </li>
            <li class="nav-item" @click.left="AddEventRouter">
                <a href="#" class="nav-link">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-8 h-8"
                    >
                    <g class="fa-group">
                        <path
                            fill-rule="evenodd"
                            d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z"
                            clip-rule="evenodd"
                            class="fa-secondary"
                        />
                        </g>
                    </svg>

                    <span class="link-text font-black">Add Schedule</span>
                </a>
            </li>
            <li class="nav-item" @click.left="categoryRouter">
                <a href="#" class="nav-link">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fad"
                        data-icon="category"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M64 144c26.5 0 48-21.5 48-48s-21.5-48-48-48S16 69.5 16 96s21.5 48 48 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm48-208c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
                                class="fa-secondary"
                            ></path>
                        </g>
                    </svg>
                    <span class="link-text font-black">Category</span>
                </a>
            </li>
            <li class="nav-item" @click.left="userRouter">
                <a href="#" class="nav-link">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fad"
                        data-icon="user"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                    >
                        <path
                            d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                        />

                        <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                                class="fa-secondary"
                            ></path>
                        </g>
                    </svg>
                    <span class="link-text font-black">User</span>
                </a>
            </li>
            <li class="nav-item line-section" @click.left="signUpRouter">
                <a href="#" class="nav-link">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fad"
                        data-icon="sign-up"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                    >
                        <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                                class="fa-secondary"
                            ></path>
                        </g>
                    </svg>
                    <span class="link-text font-black">Sign Up</span>
                </a>
            </li>
            <li
                v-if="TokenService.checkLocalStorage()"
                class="nav-item"
                @click.left="loginRouter"
            >
                <a href="#" class="nav-link">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fad"
                        data-icon="login"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
                                class="fa-secondary"
                            ></path>
                        </g>
                    </svg>
                    <span class="link-text font-black">Login</span>
                </a>
            </li>
            <li
                v-else-if="!TokenService.checkLocalStorage()"
                class="nav-item"
                @click.left="reloadPage"
            >
                <a href="#" class="nav-link">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fad"
                        data-icon="login"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
                                class="fa-secondary"
                            ></path>
                        </g>
                    </svg>
                    <span class="link-text font-black">Logout</span>
                </a>
            </li>

            <li class="nav-item" @click.left="scheduleRouter">
                <div class="element-content"></div>
                <div class="text-center flex justify-item ml-3 mt-3">
                    <div
                        class="m-0 self-end"
                        v-if="!TokenService.checkLocalStorage()"
                    >
                        <a v-for="(role, index) in roles" :key="index" href="#">
                            <img
                                v-if="TokenService.checkRole(role)"
                                :src="`/src/assets/${role}.png`"
                                width="50"
                                height="50"
                                alt=""
                            />
                        </a>
                    </div>
                    <a v-else-if="TokenService.checkLocalStorage()" href="#">
                        <img
                            src="../assets/Guest.png"
                            width="50"
                            height="50"
                            alt=""
                        />
                    </a>

                    <div class="items-center inline-grid">
                        <div
                            v-if="!TokenService.checkLocalStorage()"
                            class="link-text text-lg font-black break-all text-left px-3"
                        >
                            {{
                                isReadmore
                                    ? TokenService.getEmail().split("@")[0]
                                    : TokenService.getEmail()
                            }}
                            <br />
                            <span
                                class="toggle-hover text-sm font-light cursor-pointer"
                                @click="toggleReadmore"
                                >{{ isReadmore ? "...more" : " less" }}</span
                            >
                        </div>
                        <!-- <p
                            v-if="!TokenService.checkLocalStorage()"
                            class="link-text font-normal text-left pl-3"
                        >
                            {{ TokenService.getRole() }}
                        </p> -->
                        <p v-else class="link-text font-black text-xl pl-3">
                            Guest
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
:root {
    font-size: 16px;
    font-family: "Open Sans";
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #23232e;
    --bg-secondary: #141418;
    --transition-speed: 600ms;

    overflow: hidden;
}

.element-content {
    margin: 0 1.5rem;
    width: 200px;
}
.toggle-hover:hover {
    color: #f0eeee;
}
.navbar {
    position: fixed;
    background-color: #222222;
    transition: width 600ms ease;
    overflow: hidden;
    z-index: 1;
}

.navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.line-section {
    border-top: solid 4px #3a3a3a;
}

.nav-item {
    width: 100%;
}

.nav-item:last-child {
    margin-top: auto;
}

.nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: var(--text-primary);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--transition-speed);
}

.nav-link:hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: var(--text-secondary);
}
.link-text {
    display: none;
    color: #b6b6b6;
}

.link-text p {
    margin-left: 0;
}

.nav-link svg {
    width: 2rem;
    min-width: 2rem;
    margin: 0 1.5rem;
}

.navbar img {
    min-width: 50px;
    transition: all 600ms ease;
}
.navbar:hover img {
    min-width: 70px;
    transition: all 600ms ease-in-out;
}

.fa-primary {
    color: #fc6f07;
}

.fa-secondary {
    color: #f99952;
}

.fa-primary,
.fa-secondary {
    transition: var(--transition-speed);
}

.logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    font-size: 1.5rem;
    letter-spacing: 0.3ch;
    width: 100%;
}

.logo svg {
    transform: rotate(0deg);
    transition: var(--transition-speed);
}

.logo-text {
    display: inline;
    position: absolute;
    left: -999px;
    transition: var(--transition-speed);
}

.navbar:hover .logo svg {
    transform: rotate(-180deg);
}

/* Small screens */
@media only screen and (max-width: 600px) {
    .navbar {
        bottom: 0;
        width: 100vw;
        height: 5rem;
    }

    .logo {
        display: none;
    }

    .navbar-nav {
        flex-direction: row;
    }

    .nav-link {
        justify-content: center;
    }

    main {
        margin: 0;
    }
}

/* Large screens */
@media only screen and (min-width: 600px) {
    .navbar {
        top: 0;
        width: 6rem;
        height: 100vh;
    }

    .navbar:hover {
        width: 16rem;
    }

    .navbar:hover .link-text {
        display: inline;
    }

    .navbar:hover .logo svg {
        margin-left: 11rem;
    }

    .navbar:hover .logo-text {
        left: 0px;
    }
}

.dark {
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #23232e;
    --bg-secondary: #141418;
}

.light {
    --text-primary: #1f1f1f;
    --text-secondary: #000000;
    --bg-primary: #ffffff;
    --bg-secondary: #e4e4e4;
}

.solar {
    --text-primary: #576e75;
    --text-secondary: #35535c;
    --bg-primary: #fdf6e3;
    --bg-secondary: #f5e5b8;
}

.theme-icon {
    display: none;
}

.dark #darkIcon {
    display: block;
}

.light #lightIcon {
    display: block;
}

.solar #solarIcon {
    display: block;
}
</style>
