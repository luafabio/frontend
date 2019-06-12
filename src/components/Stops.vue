<template>
  <div class="stops container">
    <Alert v-if="alert" v-bind:message="alert"/>
      <router-link class="btn btn-secondary float-right" style="margin-top: 10px" to="/add">Agregar Parada</router-link>

    <h1 class="page-header">Paradas de colectivo</h1>
    <div class="panel-group" id="accordion">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <hr width="75%" />
            <button class="btn btn-secondary btn-lg btn-block" type="button" data-toggle="collapse" data-target="#map" aria-expanded="false" aria-controls="collapseExample">
              Ver mapa
            </button>
          </h4>
        </div>
        <div id="map" class="collapse ">
          <GmapMap class="my-20 borde"
            v-bind:center="center"
            v-bind:zoom="15"
            :options="{
              zoomControl: false,
              disableDefaultUi: true,
              streetViewControl: false,
              mapTypeControl: false
            }"
            style="height: 500px">
            <GmapMarker
              v-bind:key="index"
              v-for="(m, index) in markersStop"
              v-bind:position="m.position"
              v-bind:clickable="true"/>
          </GmapMap>
        </div>
      </div>
    </div>
    <hr width="75%" />
    <div class="form-group">
      <input class="form-control align-content-center justify-content-center" placeholder="Enter Stop's Name"
             v-model="filterInput">
    </div>
      <br>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">N. Parada</th>
          <th scope="col">Latitud</th>
          <th scope="col">Longitud</th>
          <th scope="col">Estado</th>
          <th scope="col">Nombre</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stop in filterBy(stops, filterInput)">
          <td>{{stop.num_stop}}</td>

          <td>{{stop.lat}}</td>
          <td>{{stop.long}}</td>
          <td v-if="stop.status == true">Active</td>
          <td v-else>Not Active</td>
          <td>{{stop.name}}</td>
          <td>
            <router-link class="btn btn-secondary" v-bind:to="'/stop/'+stop._id">View</router-link>
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
        if (this.onceStops === 0 && this.stops.length > 0) {
          this.onceStops = 1;
          for (let i = 0; i < this.stops.length; i++) {
            this.markersStop.push({position: {lat: Number(this.stops[i].lat), lng: Number(this.stops[i].long)}})
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
