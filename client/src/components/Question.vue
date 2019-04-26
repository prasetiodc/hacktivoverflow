<template>
  <div>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <h2 style="text-align:left;">{{ question.title }}</h2>
        <div>
          <b-row>
            <b-col>
              <img
                href
                src="../assets/up.png"
                alt="upvote"
                style="widht: 60px; height: 30px;"
                @click.prevent="upvoteQuestion"
              >
              <div>
                <h3>{{ question.upvotes-question.downvotes }}</h3>
              </div>
              <img
                src="../assets/down.png"
                alt="upvote"
                style="widht: 60px; height: 30px;"
                @click.prevent="downvoteQuestion"
              >
            </b-col>
            <b-col cols="8">
              <h4 style="text-align:left;">{{ question.description }}</h4>
            </b-col>
            <b-col></b-col>
          </b-row>
        </div>

        <!-- LIST ANSWER -->
        <div id style="margin: 20px 0;">
          <h5 style="text-align: left; color: black;">Answer</h5>
          <h3 v-if="question.answers.length===0">Still no Answer</h3>
          <b-list-group flush v-for="(answer, index) in question.answers" :key="index">
            <b-list-group-item>
              <b-row>
                <b-col cols="2" style="display: flex; align-items: center; flex-direction: column;">
                  <img
                    href
                    src="../assets/up.png"
                    alt="upvote"
                    style="widht: 60px; height: 30px;"
                    @click.prevent="upvoteAnswer(answer._id)"
                  >
                  <div>
                    <h3>{{ answer.upvotes-answer.downvotes }}</h3>
                  </div>
                  <img
                    src="../assets/down.png"
                    alt="upvote"
                    style="widht: 60px; height: 30px;"
                    @click.prevent="downvoteAnswer(answer._id)"
                  >
                </b-col>
                <b-col style="text-align:left;">
                  <h4 class="card-title">{{ answer.title }}</h4>
                  <p>{{ answer.description }}</p>
                </b-col>
                <b-col cols="1"></b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </div>

        <!-- FORM ADD ANSWER -->
        <b-form
          method="POST"
          @submit.prevent="add"
          style="border: 1px solid gray; border-radius: 10px; padding: 20px; margin-bottom: 40px;"
        >
          <h1>Your Answer</h1>

          <b-form-group label="Title :" label-for="title">
            <b-form-input id="title" required placeholder="Title" v-model="title"></b-form-input>
          </b-form-group>

          <b-form-group label="Description :" label-for="description">
            <b-form-input id="description" required placeholder="Description" v-model="description"></b-form-input>

            <!-- <wysiwyg id="description" v-model="description"></wysiwyg> -->
          </b-form-group>

          <div>
            <b-button type="submit" variant="primary">Post Your Answer</b-button>
            <b-button type="submit" variant="danger">Cancel</b-button>
          </div>
        </b-form>

        <!-- MODAL ANSWER-->
        <b-modal id="editAnswer" title="New Task" ref="editAnswer">
          <form>
            <b-container fluid>
              <b-form-group label="Title :" label-for="title">
                <b-form-input id="title" v-model="titleAnswer" required placeholder="Task Title"></b-form-input>
              </b-form-group>
              <b-form-group label="Desription :" label-for="description">
                <b-form-input
                  id="description"
                  v-model="descriptionAnswer"
                  required
                  placeholder="Task Short Desription"
                ></b-form-input>
              </b-form-group>
            </b-container>
          </form>
          <div slot="modal-footer">
            <b-button variant="success" @click="updateAnswer">Save</b-button>
          </div>
        </b-modal>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "detail",
  data() {
    return {
      id: this.$route.params,
      show: true,
      titleQuestion: "",
      descriptionQuestion: "",
      question: {},
      titleAnswer: "",
      descriptionAnswer: "",
      idAnswerSelected: "",
      showEdit: false,
      userIdLogin: this.$store.state.userIdLogin
    };
  },
  watch: {
    $route() {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
    console.log(question);
  },
  methods: {
    loadData() {
      axios
        .get(`http://localhost:3000/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data;
          this.titleQuestion = data.title;
          this.descriptionQuestion = data.description;
        })
        .catch(err => {
          console.log(err);
        });
    },
    add() {
      if (localStorage.getItem("token")) {
        const newData = {
          title: this.title,
          description: this.description,
          questionId: this.$route.params.id
        };
        axios
          .post("http://localhost:3000/answers/", newData, {
            headers: {
              token: localStorage.token
            }
          })
          .then(({ data }) => {
            this.title = "";
            this.description = "";
            swal("Add answer Success!", "", "success");
            this.loadData();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        swal("You Must Signin!", "", "error");
      }
    },
    upvoteQuestion() {
      if (localStorage.getItem("token")) {
        axios
          .patch(
            `http://localhost:3000/questions/${this.$route.params.id}/upvote`
          )
          .then(({ data }) => {
            this.loadData();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        swal("You Must Signin!", "", "error");
      }
    },
    downvoteQuestion() {
      if (localStorage.getItem("token")) {
        axios
          .patch(
            `http://localhost:3000/questions/${this.$route.params.id}/downvote`
          )
          .then(({ data }) => {
            this.loadData();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        swal("You Must Signin!", "", "error");
      }
    },
    upvoteAnswer(id) {
      if (localStorage.getItem("token")) {
        axios
          .patch(`http://localhost:3000/answers/${id}/upvote`)
          .then(({ data }) => {
            this.loadData();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        swal("You Must Signin!", "", "error");
      }
    },
    downvoteAnswer(id) {
      if (localStorage.getItem("token")) {
        axios
          .patch(`http://localhost:3000/answers/${id}/downvote`)
          .then(({ data }) => {
            this.loadData();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        swal("You Must Signin!", "", "error");
      }
    }
  }
};
</script>

<style scoped>
.headerCard {
  display: flex;
  justify-content: space-between;
}
.list-group-flush:last-child .list-group-item:last-child {
  border-bottom: 1px solid rgb(223, 221, 221);
}
.row {
  margin-top: 40px;
}
</style>
