<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h2 class="page-header my-20">Agregar Parada de Colectivo</h2>
    <hr width="100%"/>
    <form v-on:submit="addStop">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <location-picker class="my-20 borde" v-model="location" :options="options"></location-picker>
          </div>
          <div class="col-4">
            <div class="well">
              <div class="form-group">
                <div class="form-group">
                  <label><b>Nombre</b></label>
                  <input type="text" class="form-control" placeholder="Ingrese un nombre" v-model="stop.name">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-8">
                    <label><b>Estado</b></label>
                    <select class="custom-select">
                      <option value="true" v-model="stop.status" selected>Activa</option>
                      <option value="false" v-model="stop.status"> No Activa</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label><b>N. de Parada</b></label>
                    <input type="number" class="form-control" placeholder="" v-model="stop.num_stop">
                  </div>
                </div>
                <button type="submit" class="btn btn-success my-20 float-right">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          marker: { /** marker options **/},
          autocomplete: { /** autocomplete options **/}
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
      cord() {
        this.stop.lat = this.location.lat.toFixed(6);
        this.stop.long = this.location.lng.toFixed(6);
      },
      addStop(e) {
        if (!this.stop.lat || !this.stop.long || !this.stop.num_stop || !this.stop.name) {
          this.alert = 'Por favor complete todos los campos';
        } else if (isNaN(this.stop.lat)) {
          this.alert = 'Por favor ingrese un numero valido en Latitud';
        } else if (isNaN(this.stop.long)) {
          this.alert = 'Por favor ingrese un numero valido en Longitud';
        } else if (!Number.isInteger(parseInt(this.stop.num_stop))) {
          this.alert = 'Por favor ingrese un numero valido en Numero Parada';
        } else if (parseInt(this.stop.num_stop) < 0) {
          this.alert = 'Por favor ingrese un numero mayor que cero en Numero de Parada';
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
          this.$router.push({path: '/stops', query: {alert: 'Parada agregada en forma exitosa'}});
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
