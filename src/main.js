import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Stops from './components/Stops'
import About from './components/About'
import Add from './components/Add'
import StopDetails from './components/StopDetails'
import Edit from './components/Edit'
import Buses from './components/Buses'
import Cover from './components/Cover'
import Alarms from "./components/Alarms";
import VeeValidate from 'vee-validate'
import * as LocationPicker from 'vue2-location-picker'
import * as VueGoogleMaps from 'vue2-google-maps'
import BusDetail from "./components/BusDetail";


Vue.use(LocationPicker, {
  installComponents: false,
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBCXAzjr6KjZZDAyLu_P8co4UgX8aL78vU',
  }
});

Vue.use(VeeValidate);

Vue.config.productionTip = false;

Vue.use(vueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Cover},
    {path: '/stops', component: Stops},
    {path: '/about', component: About},
    {path: '/add', component: Add},
    {path: '/stop/:id', component: StopDetails},
    {path: '/edit/:id', component: Edit},
    {path: '/buses', component: Buses},
    {path: '/bus/:id', component: BusDetail},
    {path: '/bings', component: Alarms},
  ]
});

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  <div id="app">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Hermes</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/stops">Paradas</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/buses">Colectivos</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/bings">Alarmas</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/about">Nosotros</router-link>
      </li>
    </ul>
  </div>
</nav>
    <router-view></router-view>
  </div>
  `
}).$mount('#app')
