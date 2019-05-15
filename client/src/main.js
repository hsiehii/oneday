import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import {store} from './store';

import DayView from './components/dayView/DayView.vue';
import BacklogsView from './components/backlogsView/BacklogsView.vue';

const routes = [
  { path: '/days/today', component: DayView },
  { path: '/backlogs', component: BacklogsView }
];

const router = new Router({
  mode: "history",
  routes
});

Vue.config.productionTip = false;

Vue.use(Router);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
