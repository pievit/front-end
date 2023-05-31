<template>
  <div class="container-sm">
    <div class="row justify-content-center" align="center">
      <b-jumbotron
        header="Tassisti Disponibili"
        bg-variant="light"
        border-variant="dark"
        lead="Seleziona il tassista che fa per te"
        rounded
        class="col-12 col-md-10"
      >
        <hr />
        <div id="tassisti" v-if="tasDisp.length != 0">
          <div class="card" v-for="tas in tasDisp" :key="tas[0]" align="left">
            <div class="card-body">
              <h5 class="card-title">Tassista: {{ tas[2] }} {{ tas[1] }}</h5>
              <p class="card-text">
                <b>Macchina:</b> {{ tas[7] }} <b>Targa</b>: {{ tas[6] }}
                <b>Numero Posti</b>: {{ tas[8] }}
              </p>
              <div class="row">
                <div class="col-4">
                  <b>Bagagliaio:</b>
                  <span v-if="tas[9]"
                    ><b-icon icon="check-lg" variant="success"></b-icon
                  ></span>
                  <span v-else
                    ><b-icon icon="x-lg" variant="danger"></b-icon
                  ></span>
                </div>
                <div class="col-4">
                  <b>Seggiolino:</b>
                  <span v-if="tas[10]"
                    ><b-icon icon="check-lg" variant="success"></b-icon
                  ></span>
                  <span v-else
                    ><b-icon icon="x-lg" variant="danger"></b-icon
                  ></span>
                </div>
                <div class="col-4">
                  <b-btn
                    variant="outline-primary"
                    id="selbtn"
                    @click="selezionaTas(tas[0])"
                    >Seleziona</b-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tassisti" v-else>
          <h5>Nessun Tassista Disponibile</h5>
        </div>
        <br />
        <hr />
        <div class="row" align="center">
          <div class="col-2">
            <b-btn variant="danger" to="/nuovaPrenotazione">Indietro</b-btn>
          </div>
          <div class="col-2">
            <b-btn variant="primary" to="/homeCliente">Home</b-btn>
          </div>
        </div>
        <br />
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "tassistiDisp",
  data() {
    return {
      datiPren: JSON.parse(localStorage.datiPren),
      tasDisp: JSON.parse(localStorage.tassistiDisp),
    };
  },
  methods: {
    selezionaTas(email) {
      document.getElementById("selbtn").innerHTML =
        "<div class='spinner-border spinner-border-sm' role='status'></div>";
      var pre = {
        partenza: this.datiPren["partenza"],
        arrivo: this.datiPren["arrivo"],
        data: this.datiPren["data"],
        ora: this.datiPren["ora"],
        n_posti: this.datiPren["n_posti"],
        seggiolino: this.datiPren["seggiolino"],
        bagagliaio: this.datiPren["bagagliaio"],
        pagamento: this.datiPren["pagamento"],
        prezzo: 0.0,
        stato: "nuova",
        cliente: this.datiPren["cliente"],
        tassista: email,
        codice: "",
      };
      axios
        .put("/api/prenotazione/addPrenotazione", { prenotazione: pre })
        .then((res) => {
          alert(res.data);
          sessionStorage.clear();
          location.href = "/prenotazioniCliente";
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(email);
    },
  },
  mounted: function () {
    console.log(localStorage.datiPren);
  },
};
</script>

<style scoped></style>
