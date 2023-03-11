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
              <b-form-input v-model="npatente" name="npatente" id="npatente" placeholder="Codice patente:" required :value="npatente"></b-form-input>
            </div>
            <div class="col-5">
              <b-form-datepicker id="datascadenza" v-model="datascadenza" placeholder="Data scadenza Patente" required :value="datascadenza"></b-form-datepicker>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-5" >
              <b-form-input  v-model="auto"  name="auto" id="auto" placeholder="Modello automobile" required :value="auto"></b-form-input>
            </div>
            <div class="col-5">
              <b-form-input  v-model="targa"  name="targa" id="targa" placeholder="Targa automobile" required :value="targa"></b-form-input>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-2">
              <b-form-input  v-model="nposti" min="1" name="nposti" id="nposti" placeholder="N.posti:" required :value="nposti"></b-form-input>
            </div>
            <div class="col-2" >
              <label>Servizi Extra: </label>
            </div>
            <div class="col-2">
              <b-form-checkbox
                id="bagagliaio"
                name="bagagliaio"
                v-model="bagagliaio"
                value="true"
                unchecked-value="false"
              > Bagagliaio </b-form-checkbox>
            </div>

            <div class="col-2">
              <b-form-checkbox
                id="seggiolino"
                name="seggiolino"
                v-model="seggiolino"
                value="true"
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "modificaDatiTas",
  mounted(){
    var info1 = this.infoTas.split("{")
    var info2 = info1[1].toString().split("}")

    var i1 = info1[0].split(",")
    var i2 = info2[1].split(",")

    var info = i1.concat(i2)

    this.email = info[0]
    this.nome = info[1]
    this.cognome = info[2]
    this.npatente = info[3]
    this.datascadenza = new Date(info[4].replaceAll("/","-"))
    this.targa = info[7]
    this.auto = info[8]
    this.nposti = info[9]
    this.seggiolino =  info[10]
    this.bagagliaio = info[11]
    // console.log(this.datascadenza+" -- "+this.seggiolino+" -- "+this.bagagliaio)
  },

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
      var tassista = {email: this.email, nome: this.nome, cognome: this.cognome, nPatente: this.npatente, scadenza: this.datascadenza};
      var auto = {targa: this.targa, descrizione: this.auto, nPosti: this.nposti, bagagliaio: this.bagagliaio, seggiolino: this.seggiolino, tassista: tassista};
      axios.post("/api/utenti/salvaDatiTas", { tassista: tassista,automobile: auto })
        // eslint-disable-next-line no-unused-vars
        .then(response => Swal.fire({
          title: "Ottimo!",
          text: "Dati salvati correttamente",
          type: "success"
        }))
        .catch(error => {
          Swal.fire({
            title: "Errore!",
            text: error,
            type: "warning"
          })
        })
    }
  }

};

</script>

<style scoped>

</style>