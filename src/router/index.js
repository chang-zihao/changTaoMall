import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Cart = () => import("../views/cart/Cart");
const Category = () => import("../views/category/Category");
const Home = () => import("../views/home/Home");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");


//安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/category",
    component: Category
  },

  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
