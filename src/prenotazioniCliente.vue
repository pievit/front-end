<template>
  <div class="container">
    <div class="row" align="center">
      <b-jumbotron
        header="Prenotazioni effettuate"
        bg-variant="light"
        border-variant="dark"
        lead="Visualizza le tue prenotazioni"
        rounded>
    <div class="card text-center">
      <div class="card-header" align="center">
        <ul class="nav nav-tabs card-header-tabs" id="tablist" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="#accettate" role="tab" aria-controls="accettate" aria-selected="true">Accettate</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#attesa" role="tab" aria-controls="attesa" aria-selected="false">In attesa</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="tab-content mt-3">
          <div class="tab-pane active" id="accettate" role="tabpanel">

              <div class="card-text">
                 <b-table :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
             </div>

          </div>

          <div class="tab-pane" id="attesa" role="tabpanel" aria-labelledby="attesa-tab">
            <div class="card-text">
              <b-table :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
          </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
        <div class="row" align="right">
          <div class="col 4">
            <b-btn variant="primary" to="/homeCliente">Home</b-btn>
          </div>
        </div>
        <br>
      </b-jumbotron>
    </div>

<br>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
$("#tablist a").on("click", function (e) {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  $(this).tab("show");
});

export default {
  name: "prenotazioniCliente",
  data(){
    return {
      fields: ['Da', 'A', 'Data','Orario','Tassista','numPosti','Bagagliaio','Seggiolino'],
      items: [
        { Da: 'via rocco 2', A: 'Porta Marocco', Data: '12/02/23', Orario: '15.30', Tassista: "gianni@gmail.com",numPosti:1, Bagagliaio: "si" ,Seggiolino: "no" }
      ]
    }
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.status === 'awesome') return 'table-success'
    }
  }

};
</script>

<style scoped></style>
