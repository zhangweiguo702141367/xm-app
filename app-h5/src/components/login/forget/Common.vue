<template>
  <div class="CommonCtrl">
     <yd-navbar :title="xmtitle">
        <router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
     <yd-cell-group>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">登录名</span>
            <yd-input type="number" slot="right" required v-model="login_name" max="11" min="11" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入登录手机号" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item :class="{'email_show': email_can_show}">
            <span slot="left" class="yd-cell-left">邮箱</span>
            <yd-input slot="right" required v-model="forget_email" max="20" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入认证邮箱" class="yd-cell-right"></yd-input>
         </yd-cell-item>
        <div class="forget_type">
            <mu-radio label="手机找回" name="group" nativeValue="phone" v-model="forget_type"  :change="forgetchange" class="demo-radio forget_left" uncheckIcon="phone" checkedIcon="phone"/>
            <mu-radio label="邮箱找回" name="group" nativeValue="email" v-model="forget_type"  :change="forgetchange" class="demo-radio" uncheckIcon="mail outline" checkedIcon="mail outline"/>
        </div>
    </yd-cell-group>
    <yd-button size="large" :type="committype" @click.native="next_commit" class="login_commit">{{button_name}}</yd-button>
  </div>
</template>

<script>
import {loginName, registerName} from '@/config/util/regularutil'
export default {
  created () {
    this.$store.dispatch('changeTitile', '忘记密码')
  },
  data () {
    return {
      login_name: '',
      forget_email: '',
      btntype: 'primary',
      forget_type: 'phone',
      button_name: '下一步',
      email_can_show: true
    }
  },
  methods: {
    // 注册信息提交
    next_commit () {
      let loginNameRegular = loginName(this.login_name)
      if (loginNameRegular === '合法') {
      } else {
        this.$dialog.alert({mes: loginNameRegular})
        return
      }
      let params = {
        'mobile_phone': this.login_name
      }
      if (this.forget_type === 'phone') {
        // 如果是登录名找回
        this.fetch.isRegister(params)
        .then(res => {
          if (res.status === 200) {
            this.$store.dispatch('setLoginName', this.login_name)
            this.$router.push('/phoneforget')
          } else {
            this.$dialog.alert({mes: '用户不存在,请您重新输入'})
          }
        })
        .catch(error => {
          this.$dialog.alert({mes: error.data})
        })
      } else if (this.forget_type === 'email') {
        // 否则为邮箱找回
      }
    }
  },
  computed: {
    xmtitle () {
      return this.$store.state.title
    },
    forgetchange () {
      if (this.forget_type === 'email') {
        this.email_can_show = false
        this.button_name = '发送邮件'
      } else {
        this.forget_email = ''
        this.email_can_show = true
        this.button_name = '下一步'
      }
    },
    smstype () {
      let registername = registerName(this.login_name)
      if (registername === '合法') {
        this.smscodetype = 'warning'
      } else {
        this.smscodetype = 'disabled'
      }
      return this.smscodetype
    },
    committype () {
      if (this.login_name !== '' && this.forget_type === 'phone') {
        this.btntype = 'primary'
      } else if (this.login_name !== '' && this.forget_type === 'email' && this.forget_email !== '') {
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
.forget_type{
  padding-top: 0.25rem;
  height: 1rem;
}
.forget_left{
  margin-right: 1rem;
  text-align: center;
}
.login_commit{
  margin-left: 5%;
  width: 90%;
  height: 0.9rem;
}
.email_show{
  display: none;
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
