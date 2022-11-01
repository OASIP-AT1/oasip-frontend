import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import TokenService from "./services/token.js";

const app = createApp(App);
app.provide("refreshTokenFunction", async () => {
    const res = await fetch(import.meta.env.VITE_REFRESHTOKEN_URL, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            refreshToken: TokenService.getRefreshToken(),
        },
    });
    if (res.status === 200) {
        const token = await res.json();
        TokenService.setAccessToken(token.accessToken);
    } else if (res.status === 401) {
        TokenService.clearToken();
        location.replace("/");
    } else console.log("error, cannot get data");
});
app.use(router);
app.mount("#app");
