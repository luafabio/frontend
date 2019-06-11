<template>
  <div class="stops container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h2 class="page-header">Gestion de Paradas de Colectivos</h2>
    <GmapMap
      v-bind:center="center"
      v-bind:zoom="15"
      :options="{
        zoomControl: false,
        disableDefaultUi: true
      }"
      style="height: 500px">
      <GmapMarker
        v-bind:key="index"
        v-for="(m, index) in markersStop"
        v-bind:position="m.position"
        v-bind:clickable="true"/>
    </GmapMap>
    <input class="form-control align-content-center justify-content-center" placeholder="Ingrese el nombre de la parada" v-model="filterInput">
    <br>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Latitud</th>
        <th>Longitud</th>
        <th>Estado</th>
        <th>Numero de Parada</th>
        <th>Nombre</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="stop in filterBy(stops, filterInput)">
        <td>{{stop.lat}}</td>
        <td>{{stop.long}}</td>
        <td v-if="stop.status == true">Active</td>
        <td v-else>Not Active</td>
        <td>{{stop.num_stop}}</td>
        <td>{{stop.name}}</td>
        <td>
          <router-link class="btn btn-default" v-bind:to="'/stop/'+stop._id">View</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  import axios from 'axios';
  import {gmapApi} from 'vue2-google-maps'
  const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/';

  export default {
    name: 'stops',
    computed: {
      google: gmapApi
    },
    data() {
      return {
        center: {
          lat: -34.097403,
          lng: -59.037281
        },
        markersStop: [],
        onceStops: 0,
        stops: [],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchStops() {
        axios.get(`${BASE_URL}stops`)
          .then(resp => {
            this.stops = JSON.parse(JSON.stringify(resp.data));
          });
      },
      filterBy(list, value) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function (stop) {
          return stop.name.indexOf(value) > -1;
        });
      }
    },
    watch: {
      stops: function (val) {
        if (this.onceStops === 0 && this.stops.length > 0){
          this.onceStops =1;
          for (let i = 0; i < this.stops.length; i++) {
            this.markersStop.push({position:{lat: Number(this.stops[i].lat), lng: Number(this.stops[i].long)}})
          }
        }
      },
    },
    created: function () {
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      this.fetchStops();
    }
    ,
    updated: function () {
      this.fetchStops();
    },
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
