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
                         second="60"
                         type="warning"
                         initStr="获取验证码"
                         resetStr="重新获取"
                         class="yd-smscode"
                         :type="smstype"
            ></yd-sendcode>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left pd-right">密码</span>
            <yd-input slot="right" type="password" v-model="register_password" :change="passwordStrong" placeholder="6-16位字母/数字" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item :class="{'strong_show': strong_can_show}">
            <!-- <yd-rate slot="left" v-model="pwd" :showText="['很差','还行','一般','挺好','非常好']" readonly></yd-rate>
            <span slot="right">密码强度检测</span> -->
            <p class="all" slot="right">
                <input type="radio" name="b" value="0"  v-model="inputdata" disabled/>
                <span>★</span>
                <input type="radio" name="b" value="1" v-model="inputdata" disabled/>
                <span>★</span>
                <input type="radio" name="b" value="2" v-model="inputdata" disabled/>
                <span>★</span>
                <input type="radio" name="b" value="3" v-model="inputdata" disabled/>
                <span>★</span>
                <input type="radio" name="b" value="4" v-model="inputdata" disabled/>
                <span>★</span>
                <input type="radio" name="b" value="5" v-model="inputdata" disabled/>
                <span>★</span>
                <span class="pwdtxt">{{pwdtext}}</span>
              </p>
              <span slot="left">密码强度</span>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" :type="committype" @click.native="register" class="login_commit">下一步</yd-button>
    <div class="gologin">
      <router-link to="/"><span class="golong_font">已有帐号登录</span></router-link>
    </div>
    <!--  <vue-star animate="animated rubberBand" color="#F05654">
      <a slot="icon" class="fa fa-heart" @click="handleClick1"></a>
    </vue-star> -->
  </div>
</template>

<script>
import {loginName, registerName, password, code6, pwdstrongcheck, pwdtextdesc} from '@/config/util/regularutil'
export default {
  created () {
    this.$store.dispatch('changeTitile', '注册')
  },
  data () {
    return {
      pwdtext: '较弱',
      inputdata: '1',
      register_phone: '',
      register_password: '',
      register_code: '',
      smscode: false,
      smscodetype: 'disabled',
      btntype: 'primary',
      strong_can_show: true
    }
  },
  methods: {
    // 注册信息提交
    register () {
      let loginNameRegular = loginName(this.register_phone)
      if (loginNameRegular === '合法') {
      } else {
        this.$dialog.alert({mes: loginNameRegular})
        return
      }
      let regCode = code6(this.register_code)
      if (regCode === '合法') {
      } else {
        this.$dialog.alert({mes: regCode})
        return
      }
      let regPassword = password(this.register_password)
      if (regPassword === '合法') {
      } else {
        this.$dialog.alert({mes: regPassword})
        return
      }
      let params = {
        'mobile_phone': this.register_phone,
        'login_name': this.register_phone,
        'password': this.register_password,
        'code': this.register_code
      }
      this.$dialog.loading.open('正在提交......')
      this.fetch.register(params)
      .then(res => {
        if (res.status === 200) {
          this.smscode = true
          this.$dialog.toast({
            mes: '恭喜您注册成功',
            timeout: 1500,
            icon: 'success'
          })
          // 注册用户成功后跳转
          if (this.$store.state.loginurl) {
            this.$router.push(this.$store.state.loginurl)
          } else {
            this.$router.push('/')
          }
        } else {
          this.$dialog.alert({mes: res.message})
        }
      })
      .catch(error => {
        this.$dialog.alert({mes: error.data})
      })
      this.$dialog.loading.close()
    },
    // 获取注册验证码
    sendCode () {
      let params = {
        'mobile_phone': this.register_phone,
        'login_name': this.register_phone
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
        'mobile_phone': this.register_phone
      }
      this.$dialog.loading.open('发送中.....')
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
      if (this.register_phone !== '' && this.register_password !== '' && this.smscode) {
        this.btntype = 'primary'
      } else {
        this.btntype = 'disabled'
      }
      return this.btntype
    },
    passwordStrong () {
      if (this.register_password !== '') {
        this.strong_can_show = false
        let num = pwdstrongcheck(this.register_password)
        this.inputdata = num
        this.pwdtext = pwdtextdesc(this.inputdata)
      } else {
        this.strong_can_show = true
      }
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
.strong_show{
  display: none;
}
.all{
  padding-right:1em;
}
.all>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
.all>input:nth-of-type(1),
.all>span:nth-of-type(1){display:none;}
.all>span{font-size:2em;color:gold;
    -webkit-transition:color .2s;
    transition:color .2s;
}
.pwdtxt{
  margin-left: 1.8rem !important;
  font-size: .3rem !important;
  color: rgb(255, 0, 0) !important;
}
.all>input:checked~span{color:#666;}
.all>input:checked+span{color:gold;}
.pd-right{padding-right: .3rem;}
</style>
