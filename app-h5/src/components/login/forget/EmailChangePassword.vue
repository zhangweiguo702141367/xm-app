<template>
  <div class="EmailPasswordChangeCtrl">
     <yd-navbar :title="xmtitle">
        <router-link to="/login" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
     <yd-cell-group>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">登录密码</span>
            <yd-input slot="right" type="password" v-model="first_password" placeholder="请输入6-16位字母/数字" class="yd-cell-right"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="yd-cell-left">确认密码</span>
            <yd-input slot="right" type="password" v-model="second_password" placeholder="请确认上一次输入的密码" class="yd-cell-right"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" :type="committype" @click.native="forget_commit" class="login_commit">下一步</yd-button>
  </div>
</template>

<script>
import {password} from '@/config/util/regularutil'
import {urlParamObj} from '@/config/util/commonutil'
export default {
  created () {
    this.$store.dispatch('changeTitile', '邮箱找回')
    this.token = urlParamObj('token')
    this.sign = urlParamObj('sign')
  },
  data () {
    return {
      token: '',
      sign: '',
      first_password: '',
      second_password: '',
      btntype: 'primary'
    }
  },
  methods: {
    // 信息提交
    forget_commit () {
      let firstPassword = password(this.first_password)
      if (firstPassword === '合法') {
      } else {
        this.$dialog.alert({mes: '登录密码不合法，请重新输入'})
        return
      }
      let secondPassword = password(this.second_password)
      if (secondPassword === '合法') {
      } else {
        this.$dialog.alert({mes: '确认密码不合法，请重新输入'})
        return
      }
      if (this.first_password !== this.second_password) {
        this.$dialog.alert({mes: '两次密码不一致，请重新输入'})
        return
      }
      let params = {
        'password': this.first_password,
        'token': this.token,
        'sign': this.sign
      }
      this.fetch.emailChangePassword(params)
      .then(res => {
        if (res.status === 200) {
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
    }
  },
  computed: {
    xmtitle () {
      return this.$store.state.title
    },
    committype () {
      if (this.first_password !== '' && this.second_password) {
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
</style>
