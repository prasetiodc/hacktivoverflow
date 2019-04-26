<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4">
          <h3>Question list</h3>
          <b-list-group >
            <b-list-group-item class="flex-column align-items-start" v-for="(question, index) in listQuestion" :key="index" >
              <div class="d-flex w-100 justify-content-between">
                <!-- <router-link to="/addQuestion"> -->
                <router-link :to="{ name: 'detail', params: {id: question._id}}">
                  <h3>{{ question.title }}</h3>
                </router-link>
              </div>
                <h5>{{ question.description}}</h5>
              <small class="text-muted">Donec id elit non mi porta.</small>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="8">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      listQuestion: '',
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    $route() {
      this.loadData();
    },
  },
  methods: {
    loadData() {
      axios
        .get('http://localhost:3000/questions/:id/user', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => {
          this.listQuestion = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

};
</script>

<style>
.container {
  /* margin */
}
</style>
