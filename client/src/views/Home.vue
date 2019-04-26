<template>
  <div class="home">
    <b-container class="bv-example-row" style="margin-top: 30px;">
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <h3>Question list</h3>
          <b-list-group>
            <b-list-group-item
              href="#"
              class="flex-column align-items-start"
              v-for="(question, index) in questions"
              :key="index"
            >
              <router-link
                :to="{ name: 'question', params: {id: question._id}}"
                style="text-decoration: none;"
              >
                <b-row>
                  <b-col cols="2" style="text-align: center;">
                    {{ question.upvotes-question.downvotes }}
                    <br>Vote
                  </b-col>
                  <b-col cols="2" style="text-align: center;">
                    {{ question.answers.length }}
                    <br>Answer
                  </b-col>
                  <b-col>
                    <div class="d-flex w-100 justify-content-between">
                      <h3>{{ question.title }}</h3>
                    </div>
                  </b-col>
                </b-row>
              </router-link>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      questions: ""
    };
  },
  created() {
    axios
      .get("http://localhost:3000/questions")
      .then(({ data }) => {
        this.questions = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.container {
  /* margin */
}
</style>
