<template>
  <div class="PhoneCtrl">
     <yd-navbar :title="xmtitle">
        <router-link to="/commonforget" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
     <yd-cell-group>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">登录名</span>
            <yd-input slot="right" required v-model="login_name" type="number" max="11" min="11" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入手机号" class="yd-cell-right" disabled></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">手机号</span>
            <yd-input slot="right" required v-model="mobile_phone" type="number" max="11" min="11" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入认证手机号" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">验证码</span>
            <yd-input  type="number" slot="right" required v-model="forget_code" max="6" required showCancleIcon="false" :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入验证码" class="yd-cell-right yd-cell-smscode"></yd-input>
              <yd-sendcode slot="right" 
                         @click.native="sendCode" 
                         second="60"
                         type="warning"
                         initStr="获取验证码"
                         resetStr="重新获取"
                         class="yd-smscode"
                         :type="smstype"
            ></yd-sendcode>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">密码</span>
            <yd-input slot="right" type="password" v-model="forget_password" placeholder="6-16位字母/数字" class="yd-cell-right"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" :type="committype" @click.native="forget_commit" class="login_commit">下一步</yd-button>
  </div>
</template>

<script>
import {loginName, registerName, password, code6} from '@/config/util/regularutil'
export default {
  created () {
    this.$store.dispatch('changeTitile', '手机找回')
  },
  data () {
    return {
      login_name: this.$store.state.loginname,
      forget_password: '',
      mobile_phone: '',
      forget_code: '',
      smscode: false,
      smscodetype: 'disabled',
      btntype: 'primary'
    }
  },
  methods: {
    // 信息提交
    forget_commit () {
      let loginNameRegular = loginName(this.login_name)
      if (loginNameRegular === '合法') {
      } else {
        this.$dialog.alert({mes: loginNameRegular})
        return
      }
      let registerRegular = registerName(this.mobile_phone)
      if (registerRegular === '合法') {
      } else {
        this.$dialog.alert({mes: '请输入合法的认证手机号'})
        return
      }
      let regCode = code6(this.forget_code)
      if (regCode === '合法') {
      } else {
        this.$dialog.alert({mes: regCode})
        return
      }
      let regPassword = password(this.forget_password)
      if (regPassword === '合法') {
      } else {
        this.$dialog.alert({mes: regPassword})
        return
      }
      let params = {
        'login_name': this.login_name,
        'mobile_phone': this.mobile_phone,
        'password': this.forget_password,
        'code': this.forget_code
      }
      this.fetch.forgetPassword(params)
      .then(res => {
        if (res.status === 200) {
          this.smscode = true
          this.$dialog.toast({
            mes: '密码修改成功',
            timeout: 1500,
            icon: 'success'
          })
          this.$router.push('/login')
        } else {
          this.$dialog.alert({mes: res.message})
        }
      })
      .catch(error => {
        this.$dialog.alert({mes: error.data})
      })
    },
    // 获取注册验证码
    sendCode () {
      let params = {
        'mobile_phone': this.mobile_phone,
        'login_name': this.login_name
      }
      this.fetch.getSmsCode(params)
      .then(res => {
        if (res.status === 200) {
          this.smscode = true
          this.$dialog.toast({
            mes: '短信已发送成功',
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
    smstype () {
      let registername = registerName(this.mobile_phone)
      if (registername === '合法') {
        this.smscodetype = 'warning'
      } else {
        this.smscodetype = 'disabled'
      }
      return this.smscodetype
    },
    committype () {
      if (this.login_name !== '' && this.forget_password !== '' && this.smscode && this.register_nickname !== '') {
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
.yd-cell-smscode{
  width: 60%;
  left:0;
}
.yd-smscode{
  width: 35%;
}
.login_commit{
  margin-left: 5%;
  width: 90%;
  height: 0.9rem;
}
</style>
