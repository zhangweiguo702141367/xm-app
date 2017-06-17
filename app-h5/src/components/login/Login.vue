<template>
  <div class="LoginCtrl">
     <yd-navbar :title="xmtitle">
        <router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
     <yd-cell-group>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">帐号</span>
            <yd-input slot="right" required v-model="input1" max="20" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入手机号/邮箱" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">密码</span>
            <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码" class="yd-cell-right"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" :type="committype" @click.native="handleClick" class="login_commit">登录</yd-button>
    <yd-flexbox class="register_forget">
            <yd-flexbox-item class="register">
              <router-link to="/register">
              <span class="register_font">立即注册</span></router-link>
            </yd-flexbox-item>
            <yd-flexbox-item class="forget">
              <router-link to="/commonforget"><span class="forget_font">忘记密码</span></router-link>
            </yd-flexbox-item>
    </yd-flexbox>
    <hr class="hr_line">
     <yd-grids-group :rows="3">
        <yd-grids-item link="/qqlogin" class="loginicon">
            <img slot="icon" src="../../assets/images/vxLogin.png">
            <span slot="text">微信登录</span>
        </yd-grids-item>
        
        <yd-grids-item link="/vxlogin" class="loginicon">
            <img slot="icon" src="../../assets/images/qqLogin.png">
            <span slot="text">QQ登录</span>
        </yd-grids-item>

         <yd-grids-item link="/wblogin" class="loginicon">
            <img slot="icon" src="../../assets/images/qqLogin.png">
            <span slot="text">微博</span>
        </yd-grids-item>
    </yd-grids-group>
    <!--  <vue-star animate="animated rubberBand" color="#F05654">
      <a slot="icon" class="fa fa-heart" @click="handleClick1"></a>
    </vue-star> -->
  </div>
</template>

<script>
import {loginName} from '@/config/util/regularutil'
export default {
  created () {
    this.$store.dispatch('changeTitile', '登录')
  },
  data () {
    return {
      input1: '',
      input2: '',
      btntype: 'primary'
    }
  },
  methods: {
    handleClick () {
      let loginNameRegular = loginName(this.input1)
      if (loginNameRegular === '合法') {
      } else {
        this.$dialog.alert({mes: loginNameRegular})
      }
      let params = {
        'login_name': this.input1,
        'password': this.input2
      }
      this.fetch.login(params)
      .then(res => {
        if (res.status === '200') {
          this.$dialog.toast({
            mes: '登录成功',
            timeout: 1500,
            icon: 'success'
          })
        } else {
          this.$dialog.alert({mes: res.message})
        }
      })
      .catch(error => {
        this.$dialog.alert({mes: error.data})
      })
    },
    handleClick1 () {}
  },
  computed: {
    xmtitle () {
      return this.$store.state.title
    },
    committype () {
      if (this.input1 !== '' && this.input2 !== '') {
        this.btntype = 'primary'
      } else {
        this.btntype = 'disabled'
      }
      return this.btntype
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
.hr_line{
  margin-top:4rem;
  margin-bottom: 0.5rem;
}
.loginicon{
  background-color: #F0F0F0;
  border: 0px;
}

</style>
