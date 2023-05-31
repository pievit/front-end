<script setup lang="ts"></script>

<template>
  <main>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4 row" align="center">
        <div>
          <h1>AutTo</h1>
          <br />
        </div>

        <div align="center">
          <b-btn pill variant="success" href="/login/utenti/loginCliente"
            >Login Cliente</b-btn
          >
          <br /><br />
          <b-btn pill variant="primary" href="/login/utenti/loginTassista"
            >Login Tassista</b-btn
          >
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </main>
</template>
