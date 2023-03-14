<template>
  <div class="container-sm">
  <div class="row" align="center">
    <b-jumbotron
      header="Modifica Disponibilità"
      bg-variant="light"
      border-variant="dark"
      lead="Seleziona le fascie orarie in cui sei disponibile"
      rounded
    >
      <hr />
      <div class="container-sm">
        <div class="row">
          <div class="col-7" style="padding-left: 40%;">
            <select
              id="giorno"
              @change="caricaDispGiorno($event)"
              class="form-control"
            >
              <option value="lun">lunedi</option>
              <option value="mar">martedi</option>
              <option value="mer">mercoledi</option>
              <option value="gio">giovedi</option>
              <option value="ven">venerdi</option>
              <option value="sab">sabato</option>
              <option value="dom">domenica</option>
            </select>
          </div>
        </div>
        <br><br>
        <div class="row">
          <div id="divcheck"></div>
        </div>
        <br>
        <div class="row">
          <div class="col">
            <b-btn variant="info" @click="salvaDispGiorno">Salva disponibilità</b-btn>
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
      if(o1<10)
        o1 = "0"+o1
      label.innerHTML = "&nbsp"+o1 + o2+"&nbsp";
      divcheck.append(label);
      if ((i + 1) % 12 === 0 && i !== 0) {
        var br = document.createElement("br");
        divcheck.append(br);
        divcheck.append(br);
      }
    }

    axios.post("/api/utenti/getDispTassista/"+this.email).then(res => {
        try{
          this.disp = JSON.parse(res.data.toString())
          this.caricaDispGiorno("lun")
        }catch(ExceptionVar){
          alert(res.data.toString())
      }
    })
  },
  data: function(){
    return {
      email: this.$route.params.email
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    caricaDispGiorno(giorno) {
      var j = 0
      for(var i=0;i<48;i++){
        var checkbox = document.getElementById(i)
        var vetgiorno = this.disp[giorno]
        if(vetgiorno.length!=0 && vetgiorno.length>j && vetgiorno[j]==i){
          checkbox.checked = true
          j++
        }else{
          checkbox.checked = false
        }
      }
    },
    salvaDispGiorno(){

    }
  },
};
</script>

<style scoped></style>
