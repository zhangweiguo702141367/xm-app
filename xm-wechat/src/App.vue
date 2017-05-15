<template>
  <div id="app">
    <yd-navbar :title="xmtitle">
        <!-- <router-link to="/" slot="left"> -->
        <div slot="left" @click="$router.go(-1)">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        <!-- </router-link> -->
        </div>
    </yd-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    xmtitle () {
      return this.$store.state.title
    }
  },
  methods: {
  }
}
</script>

<style scoped>
 .m-navbar:after{
  border-bottom:0px;
 }
 
</style>
