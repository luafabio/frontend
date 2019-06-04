<template>
  <div class="details container">
     <router-link to="/">Back</router-link>
    <h1 class="page-header">{{stop.name}}
      <span class="pull-right">
        <router-link class="btn btn-primary" v-bind:to="'/edit/'+stop._id" >Edit</router-link>
        <button class="btn btn-danger" v-on:click="deleteStop(stop._id)">Delete</button>
      </span>
    </h1>
   <ul class="list-group">
      <li class="list-group-item">Latitud: {{stop.lat}}</li>
      <li class="list-group-item">Longitud: {{stop.long}}</li>
      <li class="list-group-item">Tiempo de parada: {{stop.eta_stop}}</li>
      <li class="list-group-item">Radio parada: {{stop.long_stop}}</li>
      <li class="list-group-item" v-if="stop.status == true">Status: Active</li>
      <li class="list-group-item" v-else>Status: Not Active</li>
      <!-- <li class="list-group-item">Status: {{stop.status}}</li> -->
      <li class="list-group-item">Numero parada: {{stop.num_stop}}</li>
      <li class="list-group-item">Modificado: {{stop.updatedAt}}</li>
      <li class="list-group-item">Creado: {{stop.createdAt}}</li>
   </ul>
  </div>
</template>

<script>

import axios from 'axios';
const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/';

export default {
  name: 'stopdetails',
  data () {
    return {
      stop: ''
    }
  },
  methods: {
     fetchStop(id) {
/*       this.$http.get('http://localhost/stops/public/api/stop/'+id)
        .then(function(response){
          this.stop = JSON.parse(JSON.stringify(response.body));
        }); */
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.get(`${BASE_URL}stops/`+id)
          .then(resp => {
            this.stop = JSON.parse(JSON.stringify(resp.data));
        });
     },
     deleteStop(id) {
/*       this.$http.delete('http://localhost/stops/public/api/stops/delete/'+id)
      .then(function(response){
         this.$router.push({path: '/', query: {alert: 'Stop Deleted'}});
      }); */
      axios.delete(`${BASE_URL}stops/`+id);
      this.$router.push({path: '/', query: {alert: 'Stop Deleted'}});
     }
  },
  created: function() {
     this.fetchStop(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>