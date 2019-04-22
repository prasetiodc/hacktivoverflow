<template>
  <div>
    <h2>Detail Product</h2>
    <div>
      <img :src="this.product.image" :alt="this.product.name" style="height: 200px;">
      <div v-if="show">
        <h3>{{ this.product.name }}</h3>
        <h4>Rp. {{ this.product.price }}</h4>
        <h6>Stock : {{ this.product.stock }}</h6>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'detail',
  data(){
    return{
      id: this.$route.params,
      show: true
    }
  },
  watch: {
    $route() {
     this.loadCart()
    },
  },
  methods: {
    loadCart(){
      axios
      .get('http://localhost:3000/products/'+this.$route.params.id)
      .then(({data}) => {
        this.product = data;
      })
      .catch(err => {
        console.log(err);
      });
    },
  },
};


</script>

<style lang="scss" scoped>
</style>
