<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Edit Stop</h1>


    <location-picker v-model="location" :options="options" class="margen borde" v-></location-picker>
    <button class="btn btn-success btn-mg" v-on:click="cord">Cargar coordenadas</button>

    <form v-on:submit="updateStop">
      <div class="well">
        <h4>Stop Info</h4>

<<<<<<< HEAD
         <div class="form-group">
               <label>Latitude</label>
               <input type="text" readonly class="form-control" placeholder="Latitud" v-model="stop.lat">
               <label>Longitude</label>
               <input type="text" readonly class="form-control" placeholder="Longitud" v-model="stop.long">
               <br>
               <label>Status</label>
               <input type="radio" id="radio" name="status" value="true" v-model="stop.status"/>Active
               <input type="radio" id="radio" name="status" value="false" v-model="stop.status"/>Not Active
               <!-- <input type="text" class="form-control" placeholder="Status" v-model="stop.status"> -->
               <br>
               <br>
               <label>Stop Number</label>
               <input type="number" class="form-control" placeholder="Stop number" v-model="stop.num_stop">
               <label>Name</label>
               <input type="text" class="form-control" placeholder="Name" v-model="stop.name">
         </div>
=======
        <div class="form-group">
          <label>Latitude</label>
          <input type="text" readonly class="form-control" placeholder="Latitud" v-model="stop.lat">
          <label>Longitude</label>
          <input type="text" readonly class="form-control" placeholder="Longitud" v-model="stop.long">
          <br>
          <label>Status</label>
          <input type="radio" id="radio" name="status" value="true" v-model="stop.status"/>Active
          <input type="radio" id="radio" name="status" value="false" v-model="stop.status"/>Not Active
          <!-- <input type="text" class="form-control" placeholder="Status" v-model="stop.status"> -->
          <br>
          <br>
          <label>Stop Number</label>
          <input type="number" class="form-control" placeholder="Stop number" v-model="stop.num_stop">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Name" v-model="stop.name">
        </div>
>>>>>>> 6388e367197a17813cce86de8bdfe17e608a2e74
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import Alert from './Alert'
  import axios from 'axios'
  import {LocationPicker} from 'vue2-location-picker'

  const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/'

  export default {
    name: 'edit',
    data() {
      return {
        location: {
          lat: -34.095724,
          lng: -59.021317
          //lat : this.stop.lat,
          //lng : this.stop.long
        },
        options: { // is not required
          map: {/** other map options **/},
          marker: { /** marker options **/},
          autocomplete: { /** autocomplete options **/}
        },
<<<<<<< HEAD
        stop: '',
        alert:''
      }
    },
    methods: {
        fetchStop(id){
          /* this.$http.get('http://localhost/stops/public/api/stop/'+id)
          .then(function(response){
            this.stop = JSON.parse(JSON.stringify(response.body));
            }); */
        axios.get(`${BASE_URL}stops/`+id)
=======
        stop: {
          lat: '',
          long: '',
          status: '',
          num_stop: '',
          name: ''
        },
        alert: ''
      }
    },
    methods: {
      watch: {
        location: function (val, oldVal) {
          this.stop.lat = val.lat;
          this.stop.long = val.lng;
        }
      },
      fetchStop(id) {
        axios.get(`${BASE_URL}stops/` + id)
>>>>>>> 6388e367197a17813cce86de8bdfe17e608a2e74
          .then(resp => {
            this.stop = JSON.parse(JSON.stringify(resp.data));
          });
      },
      updateStop(e) {
        if (!this.stop.lat || !this.stop.long || !this.stop.num_stop || !this.stop.name) {
          this.alert = 'Please fill in all required fields';
        } else if (isNaN(this.stop.lat)) {
          this.alert = 'Please enter a valid number in Latitude';
        } else if (isNaN(this.stop.long)) {
          this.alert = 'Please enter a valid number in Longitude';
        } else if (!Number.isInteger(parseInt(this.stop.num_stop))) {
          this.alert = 'Please enter a valid number in Stop Number';
        } else if (parseInt(this.stop.num_stop) < 0) {
          this.alert = 'Please enter a positive number in Stop Number';
        } else {
          axios({
            method: 'put',
            url: `${BASE_URL}stops/${this.$route.params.id}`,
            headers: {},
            data: {
              lat: this.stop.lat,
              long: this.stop.long,
              eta_stop: this.stop.eta_stop,
              long_stop: this.stop.long_stop,
              status: this.stop.status,
              num_stop: this.stop.num_stop,
              name: this.stop.name
            }
          });
          this.$router.push({path: '/stops', query: {alert: 'Stop Updated'}});
          e.preventDefault();
        }
        e.preventDefault();
      },
      cord() {
        this.stop.lat = this.location.lat.toFixed(6);
        this.stop.long = this.location.lng.toFixed(6);
      }
    },
<<<<<<< HEAD
    created: function(){
        this.fetchStop(this.$route.params.id);
=======
    created: function () {
      this.fetchStop(this.$route.params.id);
>>>>>>> 6388e367197a17813cce86de8bdfe17e608a2e74
    },
    components: {
      Alert,
      LocationPicker
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
<<<<<<< HEAD

</style>
=======
  .margen {
    margin-bottom: 20px;
  }

  .borde {
    border: 1px solid black;
  }

  .btn-mg {
    margin-bottom: 20px;
  }
</style>
>>>>>>> 6388e367197a17813cce86de8bdfe17e608a2e74
