<template>
  <div class="container-sm">
    <div class="row justify-content-center" align="center">
      <b-jumbotron
        header="Modifica Disponibilità"
        bg-variant="light"
        border-variant="dark"
        lead="Seleziona le fascie orarie in cui sei disponibile"
        rounded
        class="col-12 col-md-10"
      >
        <hr />
        <div class="container-sm">
          <div class="row">
            <div class="col-7" style="padding-left: 40%">
              <select
                id="giorno"
                @change="caricaDispGiorno($event.target.value)"
                class="form-control"
              >
                <option value="lunedi">lunedi</option>
                <option value="martedi">martedi</option>
                <option value="mercoledi">mercoledi</option>
                <option value="giovedi">giovedi</option>
                <option value="venerdi">venerdi</option>
                <option value="sabato">sabato</option>
                <option value="domenica">domenica</option>
              </select>
            </div>
          </div>
          <br /><br />
          <div class="row">
            <div id="divcheck"></div>
          </div>
          <br />
          <hr />
          <br />
          <div class="row">
            <div class="col">
              <b-btn variant="info" @click="salvaDispGiorno"
                >Salva disponibilità</b-btn
              >
            </div>
            <div class="col">
              <b-btn variant="primary" to="/homeTassista">Home</b-btn>
            </div>
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
  name: "modificaDisp",
  mounted() {
    var divcheck = document.getElementById("divcheck");
    for (var i = 0; i < 48; i++) {
      var checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      // checkbox.setAttribute("value", "true");
      // checkbox.setAttribute("unchecked-value", "false");
      checkbox.setAttribute("id", i + "");
      divcheck.append(checkbox);
      var label = document.createElement("label");
      label.setAttribute("for", i + "");
      var o1, o2;
      if (i % 2 === 0) {
        o1 = i / 2;
        o2 = ":00";
      } else {
        o1 = (i - 1) / 2;
        o2 = ":30";
      }
      if (o1 < 10) o1 = "0" + o1;
      label.innerHTML = "&nbsp" + o1 + o2 + "&nbsp";
      divcheck.append(label);
      if ((i + 1) % 12 === 0 && i !== 0) {
        var br = document.createElement("br");
        divcheck.append(br);
        divcheck.append(br);
      }
    }

    axios.get("/api/utenti/getDispTassista/" + this.email).then((res) => {
      try {
        console.log(res.data);
        this.disp = res.data;
        if (this.disp[0] != "N") {
          this.caricaDispGiorno("lunedi");
        } else {
          alert("Nessuna disponibilità ancora inserita.");
        }
      } catch (ExceptionVar) {
        console.log(ExceptionVar);
      }
    });
  },
  data: function () {
    return {
      email: this.$route.params.email,
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    caricaDispGiorno(giorno) {
      var j = 0;
      for (var i = 0; i < 48; i++) {
        var checkbox = document.getElementById(i);
        var vetgiorno = this.disp[giorno];
        if (vetgiorno && vetgiorno.length > j && vetgiorno[j] == i) {
          checkbox.checked = true;
          j++;
        } else {
          checkbox.checked = false;
        }
      }
    },
    salvaDispGiorno() {
      var giorno = document.getElementById("giorno").value;
      var disp = Array();
      var j = 0;
      for (var i = 0; i < 47; i++) {
        if (document.getElementById(i).checked == true) {
          disp[j] = i;
          j++;
        }
      }
      this.disp[giorno] = disp;
      console.log(JSON.stringify(this.disp));
      // eslint-disable-next-line no-unused-vars
      axios
        .put("/api/utenti/disponibilita", {
          email: this.email,
          disp: JSON.stringify(this.disp),
        })
        .then((res) => {
          alert(res.data.toString());
          alert("Disponibilità di " + giorno + " salvata correttamente.");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
