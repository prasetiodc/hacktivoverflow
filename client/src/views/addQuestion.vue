<template>
  <!-- <div id="container" v-if="this.$store.state.islogin"> -->
  <div id="container">
    <div id="box">
      <b-form method="POST" @submit.prevent="add">
        <h1>Add Question</h1>

        <b-form-group label="Title :" label-for="title">
          <b-form-input id="title" required placeholder="Title" v-model="title"></b-form-input>
        </b-form-group>

        <b-form-group label="Description :" label-for="description">
          <b-form-input id="description" required placeholder="Description" v-model="description"></b-form-input>

          <!-- <wysiwyg id="description" v-model="description"></wysiwyg> -->
        </b-form-group>

        <div>
          <b-button type="submit" variant="primary">Save</b-button>
          <b-button type="submit" variant="danger">Cancel</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import wysiwyg from "@/assets/js/vueWysiwyg.js"

export default {
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    add() {
      const newData = {
        title: this.title,
        description: this.description,
      };
      axios
        .post('http://localhost:3000/questions/', newData, {
          headers: {
            token: localStorage.token,
          },
        })
        .then((data) => {
          swal('Add Question Success', '', 'success');
          this.title = '';
          this.description = '';
          this.$router.push('/myQuestion');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
#box {
  width: 40%;
  border: 1px solid rgb(240, 240, 240);
  padding: 30px;
  margin-top: 50px;
}
#container {
  display: flex;
  justify-content: center;
}
</style>
