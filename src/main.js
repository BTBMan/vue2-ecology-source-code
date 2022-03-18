import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import router from './router/index.template';
import store from './store';
// import store from './store/index.template';

import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';

Vue.use(CoolLightBox);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
