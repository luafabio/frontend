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
        icon="http://maps.google.com/mapfiles/kml/paddle/go.png"
        />
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
        markersBus: [],
        markersStop: [],
      }
    },
    methods: {
      fetchBus(id) {
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
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
