<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Editar Parada</h1>
    <hr width="100%"/>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <ul class="list-group">
            <div class="jumbotron">
              <form v-on:submit="updateStop">
                <div class="well">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Latitud</label>
                      <input type="text" class="form-control" placeholder="Latitud" v-model="stop.lat">
                    </div>
                    <div class="form-group col-md-6">
                      <label>Longitud</label>
                      <input type="text" class="form-control" placeholder="Latitud" v-model="stop.long">
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Estado</label>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="status" id="exampleRadios1" value="true"
                             v-model="stop.status" checked>
                      <label class="form-check-label" for="exampleRadios1">
                        Activa
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="status" id="exampleRadios2" value="false"
                             v-model="stop.status">
                      <label class="form-check-label" for="exampleRadios2">
                        No Activa
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Numero de parada</label>
                    <input type="number" class="form-control" placeholder="Stop number" v-model="stop.num_stop">
                  </div>
                  <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" placeholder="Name" v-model="stop.name">
                  </div>
                </div>
                <button type="submit btn-secondary" class="btn btn-primary">Editar</button>
              </form>
            </div>
          </ul>
        </div>
        <div class="col-8 ">
          <location-picker v-model="location" :options="options" class="margen borde"></location-picker>
        </div>
      </div>
    </div>


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
        },
        options: {
          map: {
            zoom: 15
          },
          marker: {},
          autocomplete: { /** autocomplete options **/}
        },
        stop: '',
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
      fetchStop(id) {
        axios.get(`${BASE_URL}stops/` + id)
          .then(resp => {
            this.stop = JSON.parse(JSON.stringify(resp.data));
          });
      },
      updateStop(e) {
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
          this.$router.push({path: '/stops', query: {alert: 'Parada modificada en forma exitosa'}});
          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function () {
      this.fetchStop(this.$route.params.id);
    },
    components: {
      Alert,
      LocationPicker
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

