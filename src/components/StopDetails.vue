<template>
  <div class="details container">
    <h1 class="page-header">{{stop.name}}
      <div class="btn-group float-right" role="group" aria-label="Basic example">
        <router-link class="btn btn-secondary" style="margin-top: 10px"
                     v-bind:to="'/edit/'+stop._id">Editar
        </router-link>
        <button class="btn btn-danger" style="margin-top: 10px"
                v-on:click="deleteStop(stop._id)">Borrar
        </button>
      </div>
      <hr width="100%"/>

    </h1>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <ul class="list-group">
            <li class="list-group-item"><b>Latitud:</b> {{stop.lat}}</li>
            <li class="list-group-item"><b>Longitud:</b> {{stop.long}}</li>
            <li class="list-group-item"><b>Tiempo de parada:</b> {{stop.eta_stop}}</li>
            <li class="list-group-item"><b>Radio parada:</b> {{stop.long_stop}}</li>
            <li class="list-group-item" v-if="stop.status == true"><b>Estado:</b> Activa</li>
            <li class="list-group-item" v-else><b>Estado:</b> No Activa</li>
            <li class="list-group-item"><b>Numero parada:</b> {{stop.num_stop}}</li>
          </ul>
        </div>
        <div class="col-8 ">
          <location-picker v-model="location" :options="options" class="margen borde"></location-picker>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import axios from 'axios';
  import {LocationPicker} from 'vue2-location-picker'

  const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/';

  export default {
    name: 'stopdetails',
    data() {
      return {
        location: {
          lat: -34.095724,
          lng: -59.021317
        },
        options: {
          map: {
            zoom: 15
          },
          zoomControl: false,
          disableDefaultUi: true,
          streetViewControl: false,
          mapTypeControl: false,
          marker: {
            draggable: false
          },
          autocomplete: { /** autocomplete options **/}
        },
        stop: ''
      }
    },
    methods: {
      fetchStop(id) {
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.get(`${BASE_URL}stops/` + id)
          .then(resp => {
            this.stop = JSON.parse(JSON.stringify(resp.data));
          });
      },
      deleteStop(id) {
        axios.delete(`${BASE_URL}stops/` + id);
        this.$router.push({path: '/stops', query: {alert: 'Stop Deleted'}});
      }
    },
    created: function () {
      this.fetchStop(this.$route.params.id)
    },
    components: {
      LocationPicker
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
