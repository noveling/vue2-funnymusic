import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = ()=>import("@/view/home/home")
const Detail = ()=>import("@/view/detail/detail")
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail
    }
  ],
})
