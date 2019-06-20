<template>
  <div class="Bings container">
    <h2 class="page-header">Alarmas</h2>
    <br>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>Usuario</th>
        <th>Parada</th>
        <th>Colectivo asginado</th>
        <th>Tiempo</th>
        <th>Estado</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="bing in bings">
        <td>{{(bing.id_user).substring(0,10)}}</td>
        <td>{{bing.name_stop}}</td>
        <td>{{bing.bus_assign}}</td>
        <td>{{bing.time}}</td>
        <td>{{bing.status}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';

  const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/';

  export default {
    name: "alarms",
    data() {
      return {
        bings: []
      }
    },
    methods: {
      fetchAlarm() {
        axios.get(`${BASE_URL}bings`)
          .then(resp => {
            this.bings = JSON.parse(JSON.stringify(resp.data));
          });
      },
    },
    watch: {
    },
    created: function () {
      this.fetchAlarm();
    },
    updated: function () {
      this.fetchAlarm();
    }
  }
</script>

<style scoped>

</style>

