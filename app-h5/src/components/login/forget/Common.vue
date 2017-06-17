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
            <yd-input slot="right" required v-model="forget_phone" max="20" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入手机号" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">邮箱</span>
            <yd-input slot="right" required v-model="forget_email" max="20" required :showSuccessIcon="false" :showErrorIcon="false" placeholder="请输入认证邮箱" class="yd-cell-right"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-grids-group :rows="2">
      <yd-grids-item>
          <vue-star slot="icon" animate="animated rubberBand" color="#F8F8F8">
            <a slot="icon" class="fa fa-mobile-phone fa-x" @click="phoneClick"></a>
          </vue-star>
          <!-- <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png"> -->
          <span slot="text">手机找回</span>
      </yd-grids-item>
      <yd-grids-item>
           <vue-star slot="icon" animate="animated bounceIn" color="#F05654">
            <a slot="icon" class="fa fa-envelope-o fa-3x" @click="emailClick"></a>
          </vue-star>
          <!-- <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon> -->
          <span slot="text">邮箱找回</span>
      </yd-grids-item>
    </yd-grids-group>
    <yd-button size="large" :type="committype" @click.native="register" class="login_commit">下一步</yd-button>
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
      forget_phone: '',
      phone_statuc: false,
      email_status: false,
      smscode: false,
      forget_email: '',
      smscodetype: 'disabled',
      btntype: 'primary'
    }
  },
  methods: {
    // 注册信息提交
    register () {
      let loginNameRegular = loginName(this.forget_phone)
      if (loginNameRegular === '合法') {
      } else {
        this.$dialog.alert({mes: loginNameRegular})
        return
      }
      let params = {
        'login_name': this.forget_phone
      }
      this.fetch.register(params)
      .then(res => {
        if (res.status === 200) {
          this.smscode = true
          this.$dialog.toast({
            mes: '恭喜您注册成功',
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
    // 获取注册验证码
    sendCode () {
      let params = {
        'mobile_phone': this.forget_phone
      }
      // 先判断手机号
      this.fetch.isPhone(params)
      .then(res => {
        if (res.status === 200) {
          this.sendRealCode()
        } else {
          if (res.message === '手机号已注册!') {
            this.$dialog.alert({mes: '您的手机号已被注册,请更换手机号'})
          } else if (res.message === '手机号已被绑定!') {
            this.$dialog.confirm({
              title: '选填标题',
              mes: '该手机已被绑定，注册成功后将自动解绑',
              opts: () => {
                this.sendRealCode()
              }
            })
          } else {
            this.$dialog.alert({mes: res.message})
          }
        }
      })
      .catch(error => {
        this.$dialog.alert({mes: error.data})
      })
    },
    sendRealCode () {
      let params = {
        'mobile_phone': this.forget_phone
      }
      this.$dialog.loading.open('发送中...')
      this.fetch.getRegisterSmsCode(params)
      .then(res => {
        if (res.status === 200) {
          this.smscode = true
          setTimeout(() => {
            this.start = true
            this.$dialog.loading.close()
            this.$dialog.toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1500
            })
          }, 1000)
        } else {
          this.$dialog.alert({mes: res.message})
        }
      })
      .catch(error => {
        this.$dialog.alert({mes: error.data})
      })
      this.$dialog.loading.close()
    },
    emailClick () {
      this.email_status = !this.email_status
      console.debug('email_status=====', this.email_status)
    },
    phoneClick () {
      this.phone_status = !this.phone_status
      console.debug('phone_status=====', this.phone_status)
    }
  },
  computed: {
    xmtitle () {
      return this.$store.state.title
    },
    smstype () {
      let registername = registerName(this.forget_phone)
      if (registername === '合法') {
        this.smscodetype = 'warning'
      } else {
        this.smscodetype = 'disabled'
      }
      return this.smscodetype
    },
    committype () {
      if (this.forget_phone !== '' && this.smscode) {
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
a{
  color: ;
}
</style>
