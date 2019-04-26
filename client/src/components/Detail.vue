<template>
  <div>
    <h2>Detail Question</h2>
    <div style="border: 2px solid black; padding: 20px;">
      <div class="headerCard">
        <div>Vote : {{ question.upvotes-question.downvotes }}</div>
        <b-card-text>
          <h4 class="card-title">{{ question.title }}</h4>
        </b-card-text>
        <div>
          <b-button
            variant="success"
            size="sm"
            v-b-modal.edit
            @click="editQuestion(question.id)"
          >Edit</b-button>
          <b-button variant="danger" size="sm" @click.prevent="remove">Delete</b-button>
        </div>
      </div>
      <p>{{ question.description }}</p>
    </div>

    <!-- LIST ANSWER -->
    <div id="" style="margin: 20px 0;">
      <h5 style="text-align: left; color: black;">Answer</h5>
      <h3 v-if="question.answers.length===0">Still no Answer</h3>
      <b-list-group flush v-for="(answer, index) in question.answers" :key="index">
        <b-list-group-item>
          <b-row>
            <b-col cols="2" style="display: flex; align-items: center;">
              <div>Vote : {{ answer.upvotes-answer.downvotes }}</div>
            </b-col>
            <b-col>
              <h4 class="card-title">{{ answer.title }}</h4>
              <p>{{ answer.description }}</p>
            </b-col>
            <b-col cols="1">
              <b-button
                variant="success"
                size="sm"
                v-b-modal.editAnswer
                @click="editAnswer(answer._id)"
                v-if="userIdLogin==answer.userId"
              >Edit</b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </div>

    <!-- MODAL QUESTION -->
    <b-modal id="edit" title="New Task" ref="edit">
      <form>
        <b-container fluid>
          <b-form-group label="Title :" label-for="title">
            <b-form-input id="title" v-model="titleQuestion" required placeholder="Task Title"></b-form-input>
          </b-form-group>
          <b-form-group label="Desription :" label-for="description">
            <b-form-input
              id="description"
              v-model="descriptionQuestion"
              required
              placeholder="Task Short Desription"
            ></b-form-input>
          </b-form-group>
        </b-container>
      </form>
      <div slot="modal-footer">
        <b-button variant="success" @click="updateQuestion">Save</b-button>
      </div>
    </b-modal>

    <!-- FORM ADD ANSWER -->
    <!-- <b-form method="POST" @submit.prevent="add" style="border: 1px solid gray; border-radius: 10px; padding: 20px;">
      <h1>Your Answer</h1>

      <b-form-group label="Title :" label-for="title">
        <b-form-input id="title" required placeholder="Title" v-model="title"></b-form-input>
      </b-form-group>

      <b-form-group label="Description :" label-for="description">
        <b-form-input id="description" required placeholder="Description" v-model="description"></b-form-input>

        <!-- <wysiwyg id="description" v-model="description"></wysiwyg>
      </b-form-group>

      <div>
        <b-button type="submit" variant="primary">Post Your Answer</b-button>
        <b-button type="submit" variant="danger">Cancel</b-button>
      </div>
    </b-form> -->

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
          console.log(data);
          this.question = data;
          this.titleQuestion = data.title;
          this.descriptionQuestion = data.description;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateQuestion() {
      const newData = {
        title: this.titleQuestion,
        description: this.descriptionQuestion
      };
      axios
        .put(
          `http://localhost:3000/questions/${this.$route.params.id}`,
          newData
        )
        .then(({ data }) => {
          this.loadData();

          this.question = data;
          this.title = data.title;
          this.description = data.description;
          this.$refs.edit.hide();
        })
        .catch(err => {
          console.log(err);
        });
    },
    remove() {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios
            .delete(`http://localhost:3000/questions/${this.$route.params.id}`)
            .then(({ data }) => {
              this.question = {};
              this.loadData();
              this.$router.push("/myQuestion");
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success"
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    add() {
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
    },
    updateAnswer() {
      console.log("MASUK 1");

      const newData = {
        title: this.titleAnswer,
        description: this.descriptionAnswer
      };
      axios
        .put(`http://localhost:3000/answers/${this.idAnswerSelected}`, newData)
        .then(({ data }) => {
          this.loadData();
          this.question = data;
          this.titleAnswer = data.title;
          this.descriptionAnswer = data.description;
          this.$refs.editAnswer.hide();
        })
        .catch(err => {
          console.log(err);
        });
    },
    editAnswer(id) {
      if (id == localStorage.getItem("userId")) {
      }
      axios
        .get(`http://localhost:3000/answers/${id}`)
        .then(({ data }) => {
          this.idAnswerSelected = data._id;
          this.titleAnswer = data.title;
          this.descriptionAnswer = data.description;
        })
        .catch(err => {
          console.log(err);
        });
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
</style>
