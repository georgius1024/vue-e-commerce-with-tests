import * as VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Category from "@/views/Category.vue";
import Product from "@/views/Product.vue";
import Checkout from "@/views/Checkout.vue";
import Error from "@/views/Error404.vue";
const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/:category", name: "category", component: Category, props: true },
  { path: "/:category/:id", name: "product", component: Product, props: true },
  { path: "/checkout", name: "checkout", component: Checkout },
  { path: "/:pathMatch(.*)*", component: Error },
];
export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
