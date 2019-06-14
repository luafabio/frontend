<template>
  <div class="stops container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <router-link class="btn btn-secondary float-right" style="margin-top: 10px" to="/add">Agregar Parada</router-link>

    <h1 class="page-header">Paradas de Colectivos</h1>
    <div class="panel-group" id="accordion">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <hr width="75%"/>
            <button class="btn btn-secondary btn-lg btn-block" type="button" data-toggle="collapse" data-target="#map"
                    aria-expanded="false" aria-controls="collapseExample">
              Ver mapa
            </button>
          </h4>
        </div>
        <div id="map" class="collapse ">
          <GmapMap class="my-20 borde" v-bind:center="center" v-bind:zoom="13" :options="{ zoomControl: false,  disableDefaultUi: true, streetViewControl: false, mapTypeControl: false }"
                   style="height: 500px">
            <GmapMarker
              v-bind:key="index"
              v-for="(m, index) in markersStop"
              v-bind:position="m.position"
              v-bind:clickable="true"
              @click="openInfoWindowTemplate(index)"
              :icon="{ url: require('../../assets/marker-b.png'),}"
            />

            <gmap-info-window
              :options="{maxWidth: 300}"
              :position="infoWindow.position"
              :opened="infoWindow.open"
              @closeclick="infoWindow.open=false">
              <div v-html="infoWindow.template"></div></gmap-info-window>

            <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#009BFF'}"></gmap-polyline>

          </GmapMap>

        </div>
      </div>
    </div>
    <hr width="75%"/>
    <div class="form-group">
      <input class="form-control align-content-center justify-content-center"
             placeholder="Ingrese el nombre de la parada de colectivo"
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
        <td v-if="stop.status == true">Activa</td>
        <td v-else>No Activa</td>
        <td>{{stop.name}}</td>
        <td>
          <router-link class="btn btn-secondary" v-bind:to="'/stop/'+stop._id">Ver</router-link>
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
        infoWindow: {
          position: {lat: 0, lng: 0},
          open: false,
          template: ''
        },
        path:  [
            {lat: -34.097403,lng: -59.037281},
            {lat: -34.097429,lng: -59.036644},
            {lat: -34.100465,lng: -59.034390},
            {lat: -34.101389,lng: -59.033792},
            {lat: -34.107586,lng: -59.029163},
            {lat: -34.105041,lng: -59.024299},
            {lat: -34.104538,lng: -59.023421},
            {lat: -34.105858,lng: -59.022368},
            {lat: -34.107714,lng: -59.021291},
            {lat: -34.112829,lng: -59.020346},
            {lat: -34.115419,lng: -59.020215},
            {lat: -34.118328,lng: -59.019672},
            {lat: -34.149021,lng: -59.002130},
            {lat: -34.151400,lng: -58.999394},
            {lat: -34.154671,lng: -58.994520},
            {lat: -34.157472,lng: -58.989328},
            {lat: -34.160375,lng: -58.983693},
            {lat:-34.162363,lng: -58.979895},
            {lat: -34.162471,lng: -58.977402},
            {lat: -34.162404,lng: -58.974103},
            {lat: -34.16246,lng: -58.972394},
            {lat: -34.162548,lng: -58.969455},
            {lat: -34.162574,lng: -58.969337},
            {lat: -34.163551,lng: -58.969456},
            {lat: -34.163789,lng: -58.966078},
            {lat: -34.163923,lng: -58.963729},
            {lat: -34.164102,lng: -58.961538},
            {lat: -34.164129,lng: -58.960463},
            {lat: -34.165096,lng: -58.960497},
            {lat: -34.169738,lng: -58.960964},
            {lat: -34.171686,lng: -58.961181},
            {lat: -34.175358,lng: -58.961496},
            {lat: -34.176905,lng: -58.961752},
          ],
        markersStop: [],
        onceStops: 0,
        stops: [],
        alert: '',
        filterInput: '',
      }
    },
    methods: {
      openInfoWindowTemplate(index) {
        this.infoWindow.template = `${this.stops[index].num_stop} - ${this.stops[index].name}`;
        this.infoWindow.position = this.markersStop[index].position;
        this.infoWindow.open = true
      },
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
