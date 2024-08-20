import { createRouter, createWebHashHistory } from "vue-router";
import Home from "~/pages/Home";

export default createRouter({
    // hash 모드 (특정 페이지에서 새로고침 시 '페이지 찾을 수 없음' 방지)
    history: createWebHashHistory(),

    routes: [
        {
            path:"/",
            name: Home,
            component: Home,
        },
    ],
});