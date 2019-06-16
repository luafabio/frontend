<template>
  <div class="buses container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Colectivos</h1>
    <br>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>Imei</th>
        <th>Latitud</th>
        <th>Longitud</th>
        <th>Siguiente Parada</th>
        <th>ETA Parada</th>
        <th>Opciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="bus in buses">
        <td>{{bus.imei}}</td>
        <td>{{bus.lat}}</td>
        <td>{{bus.long}}</td>
        <td>{{bus.next_stop}}</td>
        <td>{{bus.eta_next_stop}} seg</td>
        <td>
          <router-link class="btn btn-success " v-bind:to="'/bus/'+bus._id">Recorrido</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  import axios from 'axios';

  const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/';

  export default {
    name: 'buses',
    data() {
      return {
        center: {
          lat: -34.097403,
          lng: -59.037281
        },
        markersBus: [],
        markersStop: [],
        buses: [],
        stops: [],
        alert: '',
        filterInput: '',
      }
    },
    methods: {
      fetchBuses() {
        axios.get(`${BASE_URL}list-buses`)
          .then(resp => {
            this.buses = JSON.parse(JSON.stringify(resp.data));
          })
      },
    },
    created: function () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      this.fetchBuses();
    }
    ,
    updated: function () {
      this.fetchBuses()
    },
    components: {
      Alert
    }
  }
</script>

<style scoped>

</style>
