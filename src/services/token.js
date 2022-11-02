class TokenService {
    #ACCESS_TOKEN = "accessToken";
    #REFRESH_TOKEN = "refreshToken";
    #ROLE = "role";

    getAccessToken() {
        return "Bearer " + localStorage.getItem(this.#ACCESS_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(this.#REFRESH_TOKEN);
    }

    getRole() {
        return localStorage.getItem(this.#ROLE);
    }

    setAccessToken(accessToken) {
        localStorage.setItem(this.#ACCESS_TOKEN, accessToken);
    }

    setRefreshToken(refreshToken) {
        localStorage.setItem(this.#REFRESH_TOKEN, refreshToken);
    }

    setRole(role) {
        localStorage.setItem(this.#ROLE, role);
    }

    clearToken() {
        // localStorage.removeItem(this.#ACCESS_TOKEN);
        // localStorage.removeItem(this.#REFRESH_TOKEN);
        // localStorage.removeItem(this.#ROLE);
        localStorage.clear();
    }

    isTokenExpired() {
        let payload = this.#jwtDecode(this.getAccessToken());
        const expiredAt = this.#getExpireTime(payload);
        const currentDate = Date.now();
        return expiredAt < currentDate;
    }

    getEmail(){
        let email = this.#jwtDecode(this.getAccessToken());
        return email.sub;
    }

    #jwtDecode(token) {
        // 0 = header (algorithm & token type)
        // 1 = payload (data)
        // 2 = verify signature
        // let payload = token.split(".")[1];
        // let data = Buffer.from(payload, "base64").toString("ascii");
        var payload = token.split(".")[1];
        var base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        var data = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
        return JSON.parse(data);
    }

    #getExpireTime(token) {
        return token.exp * 1000;
    }

    checkLocalStorage() {
        return (
            localStorage.getItem(this.#ACCESS_TOKEN) === null &&
            localStorage.getItem(this.#REFRESH_TOKEN) === null
        );
    }

    checkRole(role) {
        return localStorage.getItem(this.#ROLE) === role;
    }
}

export default new TokenService();
