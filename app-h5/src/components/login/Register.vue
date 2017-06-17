<template>
  <div class="ResgiterCtrl">
     <yd-navbar :title="xmtitle">
        <router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
     <yd-cell-group>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">手机号</span>
            <yd-input slot="right" required v-model="register_phone" max="20" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入手机号" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">验证码</span>
            <yd-input  slot="right" required v-model="register_code" max="20" required showCancleIcon="false" :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入验证码" class="yd-cell-right yd-cell-smscode"></yd-input>
              <yd-sendcode slot="right" 
                         @click.native="sendCode" 
                         second="15"
                         type="warning"
                         initStr="获取验证码"
                         resetStr="重新获取"
                         class="yd-smscode"
                         :type="smstype"
            ></yd-sendcode>
        </yd-cell-item>
            <yd-cell-item>
            <span slot="left" class="yd-cell-left">昵称</span>
            <yd-input slot="right" required v-model="register_nickname" max="20" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入手机号" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">密码</span>
            <yd-input slot="right" type="password" v-model="register_password" placeholder="6-16位字母/数字" class="yd-cell-right"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" :type="committype" @click.native="handleClick" class="login_commit">下一步</yd-button>
    <div class="gologin">
      <router-link to="/"><span class="golong_font">已有帐号登录</span></router-link>
    </div>
    <!--  <vue-star animate="animated rubberBand" color="#F05654">
      <a slot="icon" class="fa fa-heart" @click="handleClick1"></a>
    </vue-star> -->
  </div>
</template>

<script>
import {loginName, registerName, password} from '@/config/util/regularutil'
export default {
  created () {
    this.$store.dispatch('changeTitile', '注册')
  },
  data () {
    return {
      register_phone: '',
      register_password: '',
      register_nickname: '',
      register_code: '',
      smscode: true,
      smscodetype: 'disabled',
      btntype: 'primary'
    }
  },
  methods: {
    handleClick () {
      let loginNameRegular = loginName(this.register_phone)
      if (loginNameRegular === '合法') {
      } else {
        this.$dialog.alert({mes: loginNameRegular})
      }
      let regPassword = password(this.register_password)
      if (regPassword === '合法') {
      } else {
        this.$dialog.alert({mes: regPassword})
      }
      let params = {
        'login_name': this.register_phone,
        'password': this.register_password
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
    sendCode () {
      this.$dialog.loading.open('发送中...')
      setTimeout(() => {
        this.start = true
        this.$dialog.loading.close()
        this.$dialog.toast({
          mes: '已发送',
          icon: 'success',
          timeout: 1500
        })
      }, 1000)
    },
    handleClick1 () {}
  },
  computed: {
    xmtitle () {
      return this.$store.state.title
    },
    smstype () {
      let registername = registerName(this.register_phone)
      if (registername === '合法') {
        this.smscodetype = 'warning'
      } else {
        this.smscodetype = 'disabled'
      }
      return this.smscodetype
    },
    committype () {
      if (this.register_phone !== '' && this.register_password !== '' && this.smscode && this.register_nickname !== '') {
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
.gologin{
  margin-top: 1rem;
  text-align: center;
}
.golong_font{
  color: #72ACE3;
}
.yd-cell-smscode{
  width: 60%;
  left:0;
}
.yd-smscode{
  width: 35%;
}
</style>
