<template>
  <div class="container-sm">
    <div class="row justify-content-center" align="center">
      <b-jumbotron
        id="jumbo"
        header="Benvenuto in Autto"
        bg-variant="light"
        border-variant="dark"
        :lead="email"
        rounded
        class="col-12 col-md-10"
      >
        <br />
        <div class="row">
          <div class="col-6">
            <b-button variant="info" to="/modificaDatiTas"
              >Modifica Dati</b-button
            >
          </div>
          <div class="col-6">
            <b-button variant="primary" to="/richiesteTas">Richieste</b-button>
          </div>
        </div>

        <br />
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeTassista",
  data() {
    return {
      email: this.$route.params.email.toString(),
    };
  },
};
</script>

<style scoped></style>
