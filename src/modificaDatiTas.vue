<template>
  <div class="container-sm">
    <div class="row" align="center">
      <b-jumbotron
        header="Modifica Dati"
        bg-variant="light"
        border-variant="dark"
        lead="Inserisci i tuoi dati"
        rounded>
        <hr>

        <form action="" method="post" align="center">
          <div class="row" >
            <div class="col-5">
              <b-form-input v-model="npatente" name="npatente" id="npatente" placeholder="Codice patente:" required></b-form-input>
            </div>
            <div class="col-5">
              <b-form-datepicker id="datascadenza" v-model="datascadenza" placeholder="Data scadenza Patente" required></b-form-datepicker>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-5" >
              <b-form-input type="text" v-model="auto"  name="auto" id="auto" placeholder="Modello automobile" required></b-form-input>
            </div>
            <div class="col-5">
              <b-form-input type="text" v-model="targa"  name="targa" id="targa" placeholder="Targa automobile" required></b-form-input>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-2">
              <b-form-input type="number" v-model="nposti" min="1" name="nposti" id="nposti" placeholder="N.posti:" required></b-form-input>
            </div>
            <div class="col-2" >
              <label>Servizi Extra: </label>
            </div>
            <div class="col-2">
              <b-form-checkbox
                id="bagagliaio"
                name="bagagliaio"
                v-model="bagagliaio"
                unchecked-value="false"
              > Bagagliaio </b-form-checkbox>
            </div>

            <div class="col-2">
              <b-form-checkbox
                id="seggiolino"
                name="seggiolino"
                v-model="seggiolino"
                unchecked-value="false"
              > Seggiolino </b-form-checkbox>
            </div>

            <div class="col-2">
              <router-link
                to="/modificaDisp"
                custom
                v-slot="{ changeDisp }"
              >
              <b-btn variant="outline-primary" type="button" role="link" @click="changeDisp">Modifica Disponibilità</b-btn>
              </router-link>
            </div>
          </div>
          <br>

          <br>
          <div class="row">
            <div class="col-8" align="left">
              <b-btn variant="primary" type="button" @click="salvaDatiTas">Salva Dati</b-btn> &nbsp; &nbsp;
              <b-btn variant="danger" type="reset">Reset</b-btn>
            </div>
            <div class="col 4" align="right">
              <b-btn variant="primary" to="/homeTassista">Home</b-btn>
            </div>
          </div>
        </form>
        <br>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>

export default {
  name: "modificaDatiTas",
  data: function(){
    return {
      infoTas: this.$route.params.infoTas,
      npatente: "",
      datascadenza: "",
      targa: "",
      nposti: "",
      auto: "",
      seggiolino: "",
      bagagliaio: "",
    }
  },
  methods: {
    salvaDatiTas(){
      // console.log(this.infoTas[0])
      var info = this.infoTas.split(",")
      console.log(info[0])
    }
  }

};
</script>

<style scoped>

</style>