<template>
  <div class="exponentialCtrl">
     <yd-navbar :title="xmtitle">
        <router-link to="/weatherShow" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('changeTitile', '天气指数')
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    xmtitle () {
      return this.$store.state.title
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-navbar{
  margin-bottom:0.6rem;
}
.yd-cell-left{
  margin-right: .4rem;
}
.yd-cell-right{
  padding-right:0.30rem;
}
.login_commit{
  margin-left: 5%;
  width: 90%;
  height: 0.9rem;
}
.register_forget{
  margin-top: .2rem;
  margin-left: 5%;
  width: 90%;
  color: #000;
}
.register{
  text-align: left;
}
.register_font{
  color: #000;
}
.forget{
  text-align: right;
}
.forget_font{
  color: #000;
}
.otherLogin{
  position:absolute;
  bottom:20px;
  left:0; 
  width:100%; 
  text-align:center;
}
.otherLogin .tit{
  margin-bottom:16px;
  border-bottom:1px solid #e6e6e6;
  vertical-align:middle;
}
.otherLogin .tit span{
  position:relative; 
  top:11px; 
  display:block; 
  width:120px; 
  margin:0 auto; 
  font:400 14px/1.6em "Microsoft YaHei"; 
  color:#ddd; 
  text-align:center; 
  background:#f8f8f8;
}
.otherLogin ul{
  margin:30px 0 0; 
  overflow:hidden;
}
.otherLogin ul li{
  float:left; 
  width:33.33%; 
  text-align:center;
}
.otherLogin ul li a{
  font:400 13px/1.6em "Microsoft YaHei"; 
  color:#999; 
  text-decoration:none;
}
.otherLogin ul li span{
  display:block; 
  width:51px; 
  height:51px; 
  margin:0 auto 6px; 
  background:url(http://static5.baihe.com/images/newH5/H5_ologin.png) no-repeat; 
  background-size:100% auto;
}
.otherLogin ul li:nth-child(2) span{
  background-position:0 -52px;
}
.loginicon{
  background-color: #F0F0F0;
  border: 0px;
}

</style>
