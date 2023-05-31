<template>
  <div class="container-sm">
    <div class="row justify-content-center" align="center">
      <b-jumbotron
        header="Nuova Prenotazione"
        bg-variant="light"
        border-variant="dark"
        lead="Inserisci i dati"
        rounded
        class="col-12 col-md-10"
      >
        <hr />

        <form action="" method="post" align="center">
          <div class="row">
            <div class="col-2">
              <label for="da">Partenza: </label>
            </div>
            <div class="col-4">
              <b-form-input
                v-model="da"
                name="da"
                id="da"
                placeholder="Da:"
                required
              ></b-form-input>
            </div>
            <div class="col-2">
              <label for="a">Arrivo: </label>
            </div>
            <div class="col-4">
              <b-form-input
                v-model="a"
                name="a"
                id="a"
                placeholder="A:"
                required
              ></b-form-input>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-2">
              <label for="data">Giorno: </label>
            </div>
            <div class="col-4">
              <b-form-datepicker
                id="data"
                v-model="data"
                required
              ></b-form-datepicker>
            </div>
            <div class="col-2">
              <label for="ora">Orario: </label>
            </div>
            <div class="col-4">
              <b-form-input
                type="time"
                v-model="ora"
                name="ora"
                id="ora"
                placeholder="Orario:"
                required
              ></b-form-input>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-2">
              <label for="nposti">Numero Posti: </label>
            </div>
            <div class="col-2">
              <b-form-input
                type="number"
                v-model.number="nposti"
                min="1"
                name="nposti"
                id="nposti"
                placeholder="N.posti:"
                required
              ></b-form-input>
            </div>
            <div class="col-2">
              <label>Servizi Extra: </label>
            </div>
            <div class="col-2">
              <b-form-checkbox
                id="bagagliaio"
                name="bagagliaio"
                v-model="bagagliaio"
                value="true"
                unchecked-value="false"
              >
                Bagagliaio
              </b-form-checkbox>
            </div>

            <div class="col-2">
              <b-form-checkbox
                id="seggiolino"
                name="seggiolino"
                v-model="seggiolino"
                value="true"
                unchecked-value="false"
              >
                Seggiolino
              </b-form-checkbox>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-2">
              <label for="metodopag">Metodo di pagamento: </label>
            </div>
            <div class="col-2">
              <select id="metodopag" class="form-control">
                <option value="contanti" selected>Contanti</option>
                <option value="carta">Carta</option>
              </select>
            </div>
          </div>
          <br />
          <hr />
          <div class="row">
            <div class="col-8" align="left" style="padding-left: 2%">
              <b-btn
                variant="primary"
                id="cercabtn"
                type="button"
                @click="nuovaPren"
                >Cerca</b-btn
              >
              &nbsp; &nbsp;
              <b-btn variant="danger" type="reset">Reset</b-btn>
            </div>
            <div class="col 4" align="right">
              <b-btn variant="primary" to="/homeCliente">Home</b-btn>
            </div>
          </div>
        </form>
        <br />
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "nuovaPrenotazione",
  data: function () {
    return {
      da: "",
      a: "",
      data: "",
      ora: "",
      nposti: 1,
      bagagliaio: false,
      seggiolino: false,
      metodopag: "",
      email: this.$route.params.email.toString(),
    };
  },
  methods: {
    nuovaPren() {
      if (
        this.da.length != 0 &&
        this.a.length != 0 &&
        this.data.length != 0 &&
        this.ora.length != 0
      ) {
        document.getElementById("cercabtn").innerHTML =
          "<div class='spinner-border spinner-border-sm' role='status'></div>";
        var da = this.da;
        var a = this.a;
        var data = this.data;
        var ora = this.ora;
        var nposti = this.nposti;
        var bag = this.bagagliaio;
        var seg = this.seggiolino;
        var metpag = this.metodopag;

        var orario = ora.split(":");
        var o1 = parseInt(orario[0]);
        var o2 = parseInt(orario[1]);
        o1 *= 2;
        var o = o1;
        if (o2 > 25) {
          if (o2 > 50) {
            o += 2;
          } else {
            o++;
          }
        }
        var pren = new Array();
        pren["partenza"] = da;
        pren["arrivo"] = a;
        pren["data"] = data;
        pren["ora"] = o;
        pren["n_posti"] = nposti;
        pren["bagagliaio"] = bag;
        pren["seggiolino"] = seg;
        pren["pagamento"] = metpag;
        pren["cliente"] = this.email;

        var date = new Date(data);
        var dayNumber = date.getDay();
        var giorno = "";
        switch (dayNumber) {
          case 1:
            giorno = "lunedi";
            break;
          case 2:
            giorno = "martedi";
            break;
          case 3:
            giorno = "mercoledi";
            break;
          case 4:
            giorno = "giovedi";
            break;
          case 5:
            giorno = "venerdi";
            break;
          case 6:
            giorno = "sabato";
            break;
          default:
            giorno = "domenica";
        }

        var uri =
          "api/prenotazione/getTassistiDisp/" +
          giorno +
          "/" +
          o +
          "/" +
          nposti +
          "/" +
          bag +
          "/" +
          seg;
        // console.log(uri)
        axios.get(uri).then((res) => {
          localStorage.datiPren = JSON.stringify({ ...pren });
          localStorage.tassistiDisp = JSON.stringify({ ...res.data });
          location.href = "/tassistiDisp";
        });
      } else {
        alert("Inserisci tutti i dati per la ricerca.");
      }
    },
  },
};
</script>

<style scoped></style>
