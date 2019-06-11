// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
import VeeValidate from 'vee-validate'
import * as LocationPicker from 'vue2-location-picker'
import * as VueGoogleMaps from 'vue2-google-maps'
import BusDetail from "./components/BusDetail";


Vue.use(LocationPicker, {
  installComponents: false, // If true, create it globally
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
  ]
});

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Hermes</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/stops">Paradas</router-link></li>
            <li><router-link to="/buses">Colectivos</router-link></li>
            <li><router-link to="/about">Nosotros</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/add">Agregar Parada</router-link></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <router-view></router-view>
  </div>
  `
}).$mount('#app')
