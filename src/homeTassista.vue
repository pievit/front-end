<template>
  <div class="container-sm">
    <div class="row" align="center">
      <b-jumbotron
        id="jumbo"
        header="Benvenuto in Autto"
        bg-variant="light"
        border-variant="dark"
        :lead= "email"
        rounded
      >
        <br />
        <div class="row">
          <div class="col-6">
            <b-button variant="info" to="/modificaDati"
            >Modifica Dati</b-button
            >
          </div>
          <div class="col-6">
            <b-button variant="primary" to="/richieste">Richieste</b-button>
          </div>
        </div>

        <br />


      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeTassista"
};
</script>

<style scoped>

</style>