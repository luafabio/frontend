<template>
  <div class="edit container">
   <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Stop</h1>
    <form v-on:submit="updateStop">
      <div class="well">
         <h4>Stop Info</h4>
         <div class="form-group">
               <label>Latitude</label>
               <input type="text" class="form-control" placeholder="Latitud" v-model="stop.lat">
               <label>Longitude</label>
               <input type="text" class="form-control" placeholder="Longitud" v-model="stop.long">
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
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Alert from './Alert'
import axios from 'axios'
const BASE_URL = 'http://ec2-18-219-95-88.us-east-2.compute.amazonaws.com:3000/'

    export default {
    name: 'edit',
    data () {
      return {
        stop: {
          lat: '',
          long: '',
          status: '',
          num_stop: '',
          name: ''
        },
        alert:''
      }
    },
    methods: {
        fetchStop(id){
/*           this.$http.get('http://localhost/stops/public/api/stop/'+id)
          .then(function(response){
            this.stop = JSON.parse(JSON.stringify(response.body));
            }); */
        axios.get(`${BASE_URL}stops/`+id)
          .then(resp => {
            //let result = resp.data;
            this.stop = JSON.parse(JSON.stringify(resp.data));
            // console.log(result);
        });
        },
        updateStop(e){
         if(!this.stop.lat || !this.stop.long || !this.stop.num_stop || !this.stop.name){
           this.alert = 'Please fill in all required fields';
         } else if(isNaN(this.stop.lat)) {
           this.alert = 'Please enter a valid number in Latitude';
         } else if(isNaN(this.stop.long)) {
           this.alert = 'Please enter a valid number in Longitude';
         } else if(!Number.isInteger(parseInt(this.stop.num_stop))) {
           this.alert = 'Please enter a valid number in Stop Number';
         } else if(parseInt(this.stop.num_stop) < 0) { 
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
            })
          this.$router.push({path:'/', query: {alert: 'Stop Updated'}});
          e.preventDefault();
         }
         e.preventDefault();
        }
    },
    created: function(){
        this.fetchStop(this.$route.params.id);
    },
    components: {
        Alert
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>