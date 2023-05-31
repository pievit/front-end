import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import homeCliente from "@/homeCliente.vue";
import prenotazioniCliente from "@/prenotazioniCliente.vue";
import nuovaPrenotazione from "@/nuovaPrenotazione.vue";
import axios from "axios";
import homeTassista from "@/homeTassista.vue";
import modificaDatiTas from "@/modificaDatiTas.vue";
import modificaDisp from "@/modificaDisp.vue";
import richiesteTas from "@/richiesteTas.vue";
import tassistiDisp from "@/tassistiDisp.vue";

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
      path: "/nuovaPrenotazione",
      name: "nuovaPrenotazione",
      component: nuovaPrenotazione,
    },
    {
      path: "/homeTassista",
      name: "homeTassista",
      component: homeTassista,
    },
    {
      path: "/modificaDatiTas",
      name: "modificaDatiTas",
      component: modificaDatiTas,
    },
    {
      path: "/modificaDisp",
      name: "modificaDisp",
      component: modificaDisp,
    },
    {
      path: "/richiesteTas",
      name: "richiesteTas",
      component: richiesteTas,
    },
    {
      path: "/tassistiDisp",
      name: "tassistiDisp",
      component: tassistiDisp,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "home") {
    next();
  } else {
    axios.get("/login/utenti/getMailLogged").then((response) => {
      if (
        to.params.email !== null &&
        response.data.toString() === to.params.email
      ) {
        if (to.name === "modificaDatiTas") {
          axios
            .get("/api/utenti/getAllInfoTassista/" + to.params.email)
            .then((res) => {
              if (
                to.params.infoTas === null ||
                res.data.toString() !== to.params.infoTas
              ) {
                // console.log(res.data.toString());
                next({
                  name: to.name,
                  params: { infoTas: res.data.toString(), email: to.params.email },
                });
              } else {
                next(to.params);
              }
            });
        } else {
          next(to.params);
        }
      } else {
        next({ name: to.name, params: { email: response.data.toString() } });
      }
    });
  }
});

export default router;
