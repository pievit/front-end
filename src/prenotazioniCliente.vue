<template>
  <div class="container">
    <div class="row justify-content-center" align="center">
      <b-jumbotron
        header="Prenotazioni effettuate"
        bg-variant="light"
        border-variant="dark"
        lead="Visualizza le tue prenotazioni"
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
                        <th>Tassista</th>
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
                        <td>{{ pren.tassista }}</td>
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
                        <th>{{pren.codice}}</th>
                      </tr>
                    </tbody>
                  </table>
                </b-card-group>
                <b-card-group id="div_accettate" v-else>
                  <h1>Nessuna prenotazione confermata</h1>
                </b-card-group>
              </b-tab>
              <b-tab title="In Attesa">
                <b-card-group id="div_attesa" v-if="attesapren != null">
                  <table id="tabattesa" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Da</th>
                        <th>A</th>
                        <th>Orario</th>
                        <th>Tassista</th>
                        <th>NumPosti</th>
                        <th>Bagagliaio</th>
                        <th>Seggiolino</th>
                        <th>Prezzo</th>
                        <th>Conferma</th>
                        <th>Annulla</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="pren in attesapren" :key="pren.id">
                        <td>{{ pren.partenza }}</td>
                        <td>{{ pren.arrivo }}</td>
                        <td v-if="pren.ora % 2 == 0">{{ pren.ora / 2 }}:00</td>
                        <td v-else>{{ (pren.ora / 2) -0.5 }}:30</td>
                        <td>{{ pren.tassista }}</td>
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
                        <th>€ {{ pren.prezzo }}</th>
                        <th>
                          <span
                            ><b-btn variant="primary" @click="conferma(pren.id)" v-bind:id="'confbtn'+pren.id"
                              ><b-icon icon="arrow-bar-right"></b-icon></b-btn
                          ></span>
                        </th>
                        <th>
                          <span
                            ><b-btn
                              variant="danger"
                              @click="showModAnn(pren.id)"
                              ><b-icon icon="trash"></b-icon></b-btn
                          ></span>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </b-card-group>
                <b-card-group id="div_attesa" v-else
                  ><h1>Nessuna prenotazione in attesa</h1></b-card-group
                >
              </b-tab>
              <b-tab title="Inoltrate">
                <b-card-group id="div_inoltrate" v-if="nuovepren != null">
                  <table id="tabaccettate" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Da</th>
                        <th>A</th>
                        <th>Orario</th>
                        <th>Tassista</th>
                        <th>NumPosti</th>
                        <th>Bagagliaio</th>
                        <th>Seggiolino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="pren in nuovepren" :key="pren.id">
                        <td>{{ pren.partenza }}</td>
                        <td>{{ pren.arrivo }}</td>
                        <td v-if="pren.ora % 2 == 0">{{ pren.ora / 2 }}:00</td>
                        <td v-else>{{ (pren.ora / 2) - 0.5 }}:30</td>
                        <td>{{ pren.tassista }}</td>
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
                <b-card-group id="div_inoltrate" v-else
                  ><h1>Nessuna prenotazione inoltrata</h1></b-card-group
                >
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
        <br /><br />
        <div class="row" align="right">
          <div class="col 4">
            <b-btn variant="primary" to="/homeCliente">Home</b-btn>
          </div>
        </div>
        <br />
      </b-jumbotron>
    </div>

    <br />

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
          <b-btn type="button" variant="secondary" @click="hideMod"
            >Chiudi</b-btn
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
// $("#tablist a").on("click", function (e) {
//   e.preventDefault();
//   // eslint-disable-next-line no-undef
//   $(this).tab("show");
// });

import axios from "axios";

export default {
  name: "prenotazioniCliente",
  data() {
    return {
      email: this.$route.params.email.toString(),
      nuovepren: null,
      confermatepren: null,
      attesapren: null,
      id: null,
      motivo: "",
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === "awesome") return "table-success";
    },
    conferma(id) {
      document.getElementById("confbtn"+id).innerHTML =
        "<div class='spinner-border spinner-border-sm' role='status'></div>";
      axios
        .post("api/prenotazione/confermaPrenotazione", { id: id })
        .then((res) => {
          alert(res.data);
          location.href = "/prenotazioniCliente";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showModAnn(id) {
      this.id = id;
      this.$refs["modaleAnnulla"].show();
    },
    hideMod() {
      this.$refs["modaleAnnulla"].hide();
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
          location.href = "/prenotazioniCliente";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted: function () {
    axios
      .get("/api/prenotazione/getPrenotazioniCliente/" + this.email + "/nuova")
      .then((res) => {
        if (res.data.length != 0) {
          this.nuovepren = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "/api/prenotazione/getPrenotazioniCliente/" +
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
        "/api/prenotazione/getPrenotazioniCliente/" + this.email + "/confermata"
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
