<template>
  <div class="buses container">
    <h1 class="page-header">Colectivo</h1>
    <br>
    <GmapMap class="my-20 borde"
      v-bind:center="center"
      v-bind:zoom="15"
      :options="{
        zoomControl: false,
        disableDefaultUi: true,
        streetViewControl: false,
        mapTypeControl: false,
      }"
      style="height: 500px">

      <GmapMarker
        v-bind:key="index"
        v-for="(m, index) in markersBus"
        v-bind:position="m.position"
        v-bind:clickable="true"
        :icon="{ url: require('../../assets/marker-f.png'),}"
        />

      <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#009BFF'}"></gmap-polyline>
    </GmapMap>
  </div>
</template>

<script>
  import axios from 'axios';
  import {gmapApi} from 'vue2-google-maps' // 1 - declarar esto

  const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/';

  export default {
    computed: {
      google: gmapApi // 2 - poner esto
    },
    name: "bus",
    data() {
      return {
        center: { //aca se centra el mapa
          lat: -34.097403,
          lng: -59.037281
        },
        bus: [],
        stops: [],
        markersBus: [],
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
      }
    },
    methods: {
      fetchBus(id) {
        axios.get(`${BASE_URL}list-buses/` + id)
          .then(resp => {
            this.bus = JSON.parse(JSON.stringify(resp.data));
          });
      },
    },
    watch: {
      bus: function (val) {
        this.markersBus = [];
        this.markersBus.push({position:{lat: Number(val.lat), lng: Number(val.long)}})
      },
    },
    created: function () {
      this.fetchBus(this.$route.params.id);
    },
    updated: function () {
      this.fetchBus(this.$route.params.id);
    }
  }
</script>

<style scoped>

</style>
