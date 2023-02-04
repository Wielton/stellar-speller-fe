import { createRouter, createWebHistory } from "vue-router";
// import { storeToRefs } from "pinia";
import {useUserStore} from "../stores/user";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import MyProgressView from "../views/MyProgressView.vue";
import TestView from "../views/TestView.vue";
import AddWordView from "../views/AddWordView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: "/user/:userId/",
      
      component: UserView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          name: "user",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: MyProgressView
        },
        {
          path: "test",
          name: "test",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: TestView
        },
        {
          path: "addword",
          name: "addword",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: AddWordView
        },
      ]
    },
    
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
      meta: {
        requiresAuth: false
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
        requiresAuth: false
      },
    },
    // catch all redirect to home page
    // { path: "/:pathMatch(.*)*", redirect: "/" }
  ],

});

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if(userStore.userSession && !userStore.user){
    userStore.getAuthentication()
    console.log(userStore.user)
  }
  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  
  if (authRequired && !userStore.user) {
      userStore.returnUrl = to.fullPath;
      return {name: "login"};
  }
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
  
})
export default router;
