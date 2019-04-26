<template>
  <div id="app">
    <div id='nav'>
      <b-navbar toggleable='lg' type='dark' variant='secondary'>
        <b-navbar-brand to='/'>HaktivOverflow</b-navbar-brand>

        <b-navbar-toggle target='nav-collapse'></b-navbar-toggle>
        <b-collapse id='nav-collapse' is-nav>
          <b-navbar-nav>
            <router-link to='/addQuestion' v-if='this.$store.state.islogin'>Add Question</router-link> |
            <router-link to='/myQuestion' v-if='this.$store.state.islogin'>My Question</router-link>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class='ml-auto'>
            <b-navbar-nav right v-if='!this.$store.state.islogin'>
              <router-link to='/signin'>Signin</router-link>
            </b-navbar-nav>
            <b-navbar-nav right v-if='this.$store.state.islogin'>
              <a href='' @click.prevent='signout'>Sign Out</a>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      this.$store.commit('setLogin', false);
      this.$store.commit('setUser', '');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      // swal('Logout Success!', '', 'success');
      this.$router.push('/signin');
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
