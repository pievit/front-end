<template>
  <b-jumbotron
    header="Modifica Disponibilità"
    bg-variant="light"
    border-variant="dark"
    lead="Selezione le fascie orarie in cui sei disponibile"
    rounded
  >
    <hr />
    <div class="container-sm">
      <div class="row">
        <div class="col-2">
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
        <div class="col-10" id="divcheck"></div>
      </div>
    </div>
    <br />
  </b-jumbotron>
</template>

<script>
export default {
  name: "modificaDisp",
  mounted() {
    var divcheck = document.getElementById("divcheck");
    for (var i = 0; i < 48; i++) {
      var checkbox = document.createElement("b-form-checkbox");
      checkbox.setAttribute("value", "true");
      checkbox.setAttribute("unchecked-value", "false");
      checkbox.setAttribute("id", i + "");
      divcheck.append(checkbox);
      var label = document.createElement("label");
      label.setAttribute("for", i + "");
      var o1, o2;
      if (i % 2 == 0) {
        o1 = i / 2;
        o2 = ":00";
      } else {
        o1 = (i - 1) / 2;
        o2 = ":30";
      }
      label.setAttribute("innerHTML", o1 + o2);
      divcheck.append(label);
      if (i % 4 == 0) {
        var br = document.createElement("br");
        checkbox.append(br);
      }
    }
    document.getElementById("divcheck").load("#divcheck");
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    caricaDispGiorno(e) {},
  },
};
</script>

<style scoped></style>
