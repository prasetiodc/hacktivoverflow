import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import swal from 'sweetalert';
import router from './router';
import App from './App.vue';
import store from './store';
// import wysiwyg from './assets/js/vueWysiwyg'

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  swal,
  // wysiwyg,
  render: h => h(App),
}).$mount('#app');
