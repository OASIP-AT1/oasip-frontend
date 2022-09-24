import { createRouter, createWebHistory } from "vue-router";
import Contents from "../views/Contents.vue";
import CategoryContent from "../views/CategoryContent.vue";
import UserContents from "../views/UserContents.vue";
import LoginContents from "../views/LoginContents.vue";
import NotFound from "../views/NotFound.vue";

const history = createWebHistory(import.meta.env.VITE_BASE_URL);
const routes = [{
        path: "/schedules",
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
        path: "/",
        name: "loginContents",
        component: LoginContents
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