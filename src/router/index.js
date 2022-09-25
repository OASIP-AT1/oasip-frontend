import { createRouter, createWebHistory } from "vue-router";
import Contents from "../views/Contents.vue";
import CategoryContent from "../views/CategoryContent.vue";
import UserContents from "../views/UserContents.vue";
import HomeContents from "../views/HomeContent.vue";
import LoginContent from "../views/LoginContent.vue";
import SignUpContent from "../views/SignUpContent.vue";
import NotFound from "../views/NotFound.vue";

const history = createWebHistory(
    import.meta.env.VITE_BASE_URL);
const routes = [{
        path: "/",
        name: "homeContents",
        component: HomeContents
    }, {
        path: "/schedule",
        name: "scheduleContents",
        component: Contents,
    },
    {
        path: "/category",
        name: "categoryContents",
        component: CategoryContent,
    },
    {
        path: "/user",
        name: "userContents",
        component: UserContents,
    },
    {
        path: "/login",
        name: "loginContents",
        component: LoginContent,
    },
    {
        path: "/signUp",
        name: "signUpContents",
        component: SignUpContent,
    },
    {
        path: "/:catchNotMatchPath(.*)",
        name: "NotFound",
        component: NotFound,
      },
];

const router = createRouter({
    history,
    routes,
});

export default router;