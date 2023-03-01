<template>
  <div class="container-sm">
    <div class="row" align="center">
      <input type="hidden" id="emailsession" value="${sessionScope.email}"/>
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
            <b-button variant="info" to="/prenotazioniCliente"
              >Prenotazioni effettuate</b-button
            >
          </div>
          <div class="col-6">
            <b-button variant="primary" to="/nuovaPrenotazione">Nuova Prenotazione</b-button>
          </div>
        </div>

        <br />


      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeCliente",
  data() {
    return {
      email: this.$route.params
    }
  }

};



</script>

<style scoped></style>
