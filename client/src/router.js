import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';
import addQuestion from './views/addQuestion.vue';
import myQuestion from './views/myQuestion.vue';
import Detail from './components/Detail.vue';
import Question from './components/Question.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/signin',
      name: 'signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup,
    }, {
      path: '/addQuestion',
      name: 'addQuestion',
      component: addQuestion,
    }, {
      path: '/myQuestion',
      name: 'myQuestion',
      component: myQuestion,
      children: [
        {
          path: ':id',
          name: 'detail',
          component: Detail,
        },
      ],
    }, {
      path: '/question/:id',
      name: 'question',
      component: Question,
    }, 
  ],
});
