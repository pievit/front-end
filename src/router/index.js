import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import homeCliente from "@/homeCliente.vue";
import prenotazioniCliente from "@/prenotazioniCliente.vue";
import nuovaPrenotazione from "@/nuovaPrenotazione.vue";
import axios from "axios";


Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/homeCliente",
      name: "homeCliente",
      component: homeCliente,
    },
    {
      path: "/prenotazioniCliente",
      name: "prenotazioniCliente",
      component: prenotazioniCliente,
    },
    {
      path:"/nuovaPrenotazione",
      name: "nuovaPrenotazione",
      component: nuovaPrenotazione,
    },
  ],
});

router.beforeEach((to, from ,next ) => {
  if(to.name === "home"){
    next();
  }else{
    axios
      .get('/login/utenti/getMailLogged')
      .then(response => {
      to.params.email = response;
      next(to.params);
      })


  }

});

export default router;
