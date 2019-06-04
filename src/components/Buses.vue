<template>
  <div class="buses container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Buses</h1>
    <!-- <input class="form-control" placeholder="Enter Imei's Buse Name" v-model="filterInput"> -->
    <br>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Imei</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Next Stop</th>
      </tr>
      </thead>
      <tbody>
      <!-- <tr v-for="bus in filterBy(buses, filterInput)"> -->
        <tr v-for="bus in buses">
        <td>{{bus.imei}}</td>
        <td>{{bus.lat}}</td>
        <td>{{bus.long}}</td>
        <td>{{bus.next_stop}}</td>
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
        buses: [],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchStops() {
        axios.get(`${BASE_URL}list-buses`)
          .then(resp => {
            this.buses = JSON.parse(JSON.stringify(resp.data));
          });
      },
      // filterBy(list, value) {
      //   value = value.charAt(0).toUpperCase() + value.slice(1);
      //   return list.filter(function (bus) {
      //     return bus.imei.indexOf(value) > -1;
      //   });
      // }
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
    }
    ,
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>