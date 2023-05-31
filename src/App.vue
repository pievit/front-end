<script setup></script>

<template>
  <div style="height: 100vh" class="container-fluid">
    <div class="row align-items-center" style="height: 100vh">
      <router-view />
      <br /><br />
      <div class="row" align="right">
        <div class="col-9"></div>
        <div class="col-2" v-if="$router.currentRoute.path !== '/'">
          <b-btn variant="primary" @click="logout"
            ><b-icon icon="door-open"></b-icon> &nbsp; Logout</b-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: "App",
  methods: {
    logout() {
      axios
        .post("/logout")
        .then((res) => {
          alert(res.data);
          window.location = "/";
          window.sessionStorage.clear();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped></style>
