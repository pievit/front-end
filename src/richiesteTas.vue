<template>
  <div class="container">
    <div class="row justify-content-center" align="center">
      <b-jumbotron
        header="Richieste"
        bg-variant="light"
        border-variant="dark"
        lead="Visualizza le tue richieste di prenotazioni"
        rounded
        class="col-12 col-md-10"
      >
        <div>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Accettate" active>
                <b-card-group id="div_accettate" v-if="confermatepren != null">
                  <table id="tabaccettate" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Da</th>
                        <th>A</th>
                        <th>Orario</th>
                        <th>Cliente</th>
                        <th>NumPosti</th>
                        <th>Bagagliaio</th>
                        <th>Seggiolino</th>
                        <th>Codice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="pren in confermatepren" :key="pren.id">
                        <td>{{ pren.partenza }}</td>
                        <td>{{ pren.arrivo }}</td>
                        <td v-if="pren.ora % 2 == 0">{{ pren.ora / 2 }}:00</td>
                        <td v-else>{{ (pren.ora / 2) - 0.5 }}:30</td>
                        <td>{{ pren.cliente }}</td>
                        <th>{{ pren.n_posti }}</th>
                        <th v-if="pren.bagagliaio == true">
                          <b-icon icon="check-lg" variant="success"></b-icon>
                        </th>
                        <th v-else>
                          <b-icon icon="x-lg" variant="danger"></b-icon>
                        </th>
                        <th v-if="pren.seggiolino == true">
                          <b-icon icon="check-lg" variant="success"></b-icon>
                        </th>
                        <th v-else>
                          <b-icon icon="x-lg" variant="danger"></b-icon>
                        </th>
                        <th><span><b-btn variant="primary" @click="showModCod(pren.id)">Inserisci codice</b-btn
                        ></span></th>
                      </tr>
                    </tbody>
                  </table>
                </b-card-group>
                <b-card-group id="div_accettate" v-else>
                  <h1>Nessuna prenotazione confermata</h1>
                </b-card-group>
              </b-tab>
              <b-tab title="In Attesa">
                <b-card-group id="div_in_attesa" v-if="attesapren != null">
                  <table id="tabattesa" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Da</th>
                        <th>A</th>
                        <th>Orario</th>
                        <th>Cliente</th>
                        <th>NumPosti</th>
                        <th>Bagagliaio</th>
                        <th>Seggiolino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="pren in attesapren"
                        :key="pren.id"
                        :id="pren.id"
                      >
                        <td>{{ pren.partenza }}</td>
                        <td>{{ pren.arrivo }}</td>
                        <td v-if="pren.ora % 2 == 0">{{ pren.ora / 2 }}:00</td>
                        <td v-else>{{ (pren.ora / 2) - 0.5}}:30</td>
                        <td>{{ pren.cliente }}</td>
                        <th>{{ pren.n_posti }}</th>
                        <th v-if="pren.bagagliaio == true">
                          <b-icon icon="check-lg" variant="success"></b-icon>
                        </th>
                        <th v-else>
                          <b-icon icon="x-lg" variant="danger"></b-icon>
                        </th>
                        <th v-if="pren.seggiolino == true">
                          <b-icon icon="check-lg" variant="success"></b-icon>
                        </th>
                        <th v-else>
                          <b-icon icon="x-lg" variant="danger"></b-icon>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </b-card-group>
                <b-card-group id="div_in_attesa" v-else>
                  <h1>Nessuna prenotazione in attesa</h1>
                </b-card-group>
              </b-tab>
              <b-tab title="Da Confermare">
                <b-card-group
                  id="div_da_confermare"
                  v-if="confermarepren != null"
                >
                  <table id="tabattesa" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Da</th>
                        <th>A</th>
                        <th>Orario</th>
                        <th>Cliente</th>
                        <th>NumPosti</th>
                        <th>Bagagliaio</th>
                        <th>Seggiolino</th>
                        <th>Annulla</th>
                        <th>Conferma</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="pren in confermarepren"
                        :key="pren.id"
                        :id="pren.id"
                      >
                        <td>{{ pren.partenza }}</td>
                        <td>{{ pren.arrivo }}</td>
                        <td v-if="pren.ora % 2 == 0">{{ pren.ora / 2 }}:00</td>
                        <td v-else>{{ (pren.ora / 2) - 0.5}}:30</td>
                        <td>{{ pren.cliente }}</td>
                        <th>{{ pren.n_posti }}</th>
                        <th v-if="pren.bagagliaio == true">
                          <b-icon icon="check-lg" variant="success"></b-icon>
                        </th>
                        <th v-else>
                          <b-icon icon="x-lg" variant="danger"></b-icon>
                        </th>
                        <th v-if="pren.seggiolino == true">
                          <b-icon icon="check-lg" variant="success"></b-icon>
                        </th>
                        <th v-else>
                          <b-icon icon="x-lg" variant="danger"></b-icon>
                        </th>
                        <th>
                          <span
                            ><b-btn
                              variant="danger"
                              @click="showModAnn(pren.id)"
                              ><b-icon icon="trash"></b-icon></b-btn
                          ></span>
                        </th>
                        <th>
                          <span
                            ><b-btn variant="primary" @click="showMod(pren.id)"
                              ><b-icon icon="arrow-bar-right"></b-icon></b-btn
                          ></span>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </b-card-group>
                <b-card-group id="div_da_confermare" v-else>
                  <h1>Nessuna prenotazione da confermare</h1>
                </b-card-group>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
        <br /><br />
        <div class="row" align="right">
          <div class="col 4">
            <b-btn variant="primary" to="/homeTassista">Home</b-btn>
          </div>
        </div>
        <br />
      </b-jumbotron>
    </div>

    <br />
    <b-modal
      hide-footer
      ref="modaleConferma"
      title="Conferma la prenotazione inserendo un prezzo"
    >
      Prezzo:
      <b-form-input
        type="number"
        v-model.number="prezzo"
        min="0"
        id="prezzo"
      ></b-form-input>
      <hr />
      <b-btn
        type="button"
        id="confermabtn"
        @click="conferma()"
        variant="primary"
        >Conferma</b-btn
      > &nbsp; &nbsp;
      <b-btn type="button" variant="secondary" @click="hideMod">Chiudi</b-btn>
    </b-modal>

    <b-modal
      hide-footer
      ref="modaleCodice"
      title="Concludi la prenotazione inserendo il codice"
    >
      Codice:
      <b-form-input
        type="text"
        v-model="codice"
        id="codice"
      ></b-form-input>
      <hr />
      <b-btn
        type="button"
        id="confcodbtn"
        @click="confcod()"
        variant="primary"
      >Conferma</b-btn
      > &nbsp; &nbsp;
      <b-btn type="button" variant="secondary" @click="hideModCod">Chiudi</b-btn>
    </b-modal>

    <b-modal hide-footer ref="modaleAnnulla" title="Annulla la prenotazione">
      <div class="row">
        <textarea
          class="form-control"
          style="height: 165px"
          id="motivo"
          v-model="motivo"
          placeholder="Inserisci una motivazione per l'annullamento della prenotazione (opzionale)"
        ></textarea>
      </div>
      <hr />
      <div class="row" align="right">
        <div class="col-2">
          <b-btn
            type="button"
            id="annullabtn"
            @click="annulla()"
            variant="primary"
            >Annulla</b-btn
          > &nbsp; &nbsp;
        </div>
        <div class="col-2">
          <b-btn type="button" variant="secondary" @click="hideModAnn"
            >Chiudi</b-btn
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "richiesteTas",
  data() {
    return {
      email: this.$route.params.email.toString(),
      confermatepren: null,
      attesapren: null,
      confermarepren: null,
      prezzo: 0.0,
      id: null,
      motivo: "",
      codice: "",
    };
  },
  methods: {
    showMod(id) {
      this.id = id;
      this.$refs["modaleConferma"].show();
    },
    hideMod() {
      this.$refs["modaleConferma"].hide();
    },
    showModAnn(id) {
      this.id = id;
      this.$refs["modaleAnnulla"].show();
    },
    hideModAnn() {
      this.$refs["modaleAnnulla"].hide();
    },
    showModCod(id) {
      this.id = id;
      this.$refs["modaleCodice"].show();
    },
    hideModCod() {
      this.$refs["modaleCodice"].hide();
    },
    annulla() {
      document.getElementById("annullabtn").innerHTML =
        "<div class='spinner-border spinner-border-sm' role='status'></div>";
      axios
        .post("/api/prenotazione/rifiutaPrenotazione", {
          id: this.id,
          motivo: this.motivo,
        })
        .then((res) => {
          alert(res.data);
          location.href = "/richiesteTas";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    conferma() {
      document.getElementById("confermabtn").innerHTML =
        "<div class='spinner-border spinner-border-sm' role='status'></div>";
      var prezzo = document.getElementById("prezzo").value;
      axios
        .post("/api/prenotazione/sceltaPrenotazione", {
          id: this.id,
          prezzo: prezzo,
        })
        .then((res) => {
          document.getElementById("prezzo").value = 0.0;
          this.$refs["modaleConferma"].hide();
          alert(res.data);
          location.href = "/richiesteTas";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confcod(){
      document.getElementById("confcodbtn").innerHTML =
        "<div class='spinner-border spinner-border-sm' role='status'></div>";
        var codice = document.getElementById("codice").value;
        axios.post("/api/prenotazione/controlloCodice", {id: this.id, codice: codice}).then(res => {
          document.getElementById("codice").value = "";
          this.$refs["modaleCodice"].hide();
          alert(res.data);
          location.href = "/richiesteTas";
        }).catch(err => {
          console.log(err);
        })
    }
  },
  mounted: function () {
    axios
      .get("/api/prenotazione/getPrenotazioniTassista/" + this.email + "/nuova")
      .then((res) => {
        if (res.data.length != 0) {
          this.confermarepren = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "/api/prenotazione/getPrenotazioniTassista/" +
          this.email +
          "/attesa_conferma"
      )
      .then((res) => {
        if (res.data.length != 0) {
          this.attesapren = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "/api/prenotazione/getPrenotazioniTassista/" +
          this.email +
          "/confermata"
      )
      .then((res) => {
        if (res.data.length != 0) {
          this.confermatepren = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
