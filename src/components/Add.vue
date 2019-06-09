<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Add Stop</h1>
    <location-picker class="my-20 borde" v-model="location" :options="options"></location-picker>

    <form v-on:submit="addStop">
      <div class="well">
        <h4>Stop Info</h4>
        <div class="form-group">
        </div>
        <div class="form-group">
          <label>Latitude</label>
          <input type="text" readonly class="form-control" placeholder="Latitude" v-model="stop.lat">
        </div>
        <div class="form-group">
          <label>Longitude</label>
          <input type="text"  readonly class="form-control" placeholder="Longitude" v-model="stop.long">
        </div>

        <div class="form-group">
          <label>Status</label>
          <br>
          <label><input type="radio" id="radio" name="status" value="true" v-model="stop.status"/>Active</label>
          <br>
          <label><input type="radio" id="radio" name="status" value="false" v-model="stop.status"/>Not Active</label>
          <!-- <input type="text" class="form-control" placeholder="status" v-model="stop.status"> -->
        </div>
        <div class="form-group">
          <label>Stop Number</label>
          <input type="number" class="form-control" placeholder="Stop number" v-model="stop.num_stop">
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Name" v-model="stop.name">
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>

</template>

<script>

  import Alert from './Alert'
  import axios from 'axios'
  import {LocationPicker} from 'vue2-location-picker' // if installComponents is false

  const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/';

  export default {
    name: 'add',
    data() {
      return {
        location: {
          lat: -34.0957245,
          lng: -59.0213171
        },
        options: { // is not required
          map: {/** other map options **/},
          marker: { /** marker options **/ },
          autocomplete: { /** autocomplete options **/ }
        },
        stop: {
          lat: '',
          long: '',
          status: 'true',
          num_stop: '',
          name: '',
        },
        alert: ''
      }
    },
    watch: {
      location: function (val, oldVal) {
        this.stop.lat = val.lat.toFixed(6);
        this.stop.long = val.lng.toFixed(6);
      },
    },
    methods: {
      cord(){
        this.stop.lat = this.location.lat.toFixed(6);
        this.stop.long = this.location.lng.toFixed(6);
      },
      addStop(e) {
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
          //this.$http.post('http://localhost/stops/public/api/stops/add', newStop)
          axios({
            method: 'post',
            url: `${BASE_URL}stops`,
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
          this.$router.push({path: '/stops', query: {alert: 'Stop Added'}});
          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    components: {
      Alert,
      LocationPicker
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
