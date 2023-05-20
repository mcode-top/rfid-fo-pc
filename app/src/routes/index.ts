import * as VueRouter from "vue-router";
export const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home/Index.vue"),
    },
    {
      path: "/check",
      component: () => import("@/views/Check/Index.vue"),
    },
  ], // `routes: routes` 的缩写
});
