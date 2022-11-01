import { createRouter, createWebHistory } from "vue-router";
import ScheduleContents from "../views/ScheduleContents.vue";
import CategoryContent from "../views/CategoryContent.vue";
import UserContents from "../views/UserContents.vue";
import HomeContents from "../views/HomeContent.vue";
import LoginContent from "../views/LoginContent.vue";
import SignUpContent from "../views/SignUpContent.vue";
import NotFound from "../views/NotFound.vue";
import Permission from "../views/PermissionPage.vue";
import AddSchedule from "../views/AddSchedule.vue";

const history = createWebHistory(
    import.meta.env.VITE_BASE_URL);
const routes = [{
        path: "/",
        name: "homeContents",
        component: HomeContents
    }, {
        path: "/schedule",
        name: "scheduleContents",
        component: ScheduleContents,
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
    {
        path: "/permissionPage",
        name: "Permissionpage",
        component: Permission,
    },
    {
        path: "/AddSchedule",
        name: "AddScheduleContents",
        component: AddSchedule,
    },  
];

const router = createRouter({
    history,
    routes,
});

export default router;