import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/user/:userId/",
      component: () => import("../views/UserView.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "user",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/MyProgressView.vue"),
        },
        {
          path: "test",
          name: "test",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/TestView.vue"),
        },
        {
          path: "addword",
          name: "addword",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/AddWordView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    // catch all redirect to home page
    // { path: "/:pathMatch(.*)*", redirect: "/" }
  ],
});

router.beforeEach((to, from, next) => {
  const { userSession } = storeToRefs(useUserStore());
  if (to.meta.requiresAuth && !userSession) {
    next({ name: "login" });
  } else {
    next();
  }
});
// redirect to login page if not logged in and trying to access a restricted page

// else if ((userStore.userSession) && (!userStore.user)){
//   userStore.getAuthentication()
//   console.log(userStore.user)
//   if (to.meta.requiresAuth && !userStore.user) {
//     userStore.returnUrl = to.fullPath
//     return {name: "login"}
// }
// // else{
// //   return {name: "user", params:{userId: userStore.user.userId}}
// // }
// }

export default router;
