<template>
  <div class="LoginCtrl">
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">账号</span>
            <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">密码</span>
            <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="disabled" disabled>登录</yd-button>
    <yd-flexbox>
            <yd-flexbox-item>手机快速注册</yd-flexbox-item>
            <yd-flexbox-item class="forgetPwd">忘记密码</yd-flexbox-item>
    </yd-flexbox>
     <yd-grids-group :rows="2" class="loginicon">
        <yd-grids-item link="/qqlogin">
            <!-- <yd-icon name="qq"></yd-icon> -->
            <img slot="icon" src="../../assets/images/vxLogin.png">
            <span slot="text">微信登录</span>
        </yd-grids-item>
        <yd-grids-item link="/vxlogin">
            <img slot="icon" src="../../assets/images/qqLogin.png">
            <span slot="text">QQ登录</span>
        </yd-grids-item>
    </yd-grids-group>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('changeTitile', '忘记密码')
  },
  data () {
    return {
      input1: '',
      input2: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LoginCtrl{
  padding-left: .15rem;
  padding-right: .15rem;
  margin-top: 2rem;
}
.cell-left {
  margin-left: .2rem;
}
.m-flexbox{
  margin-top: .2rem;
  margin-bottom: 1.8rem;
}
.flexbox-item{
  font-size: .3rem;
}
.forgetPwd{
  text-align: right;
}
.m-grids-2{
  margin-bottom: .3rem;
  position: fixed;
}
.m-grids-2 .grids-item:not(:nth-child(2n)):before{
  border-right: 0rem;
}
.m-grids-2:before{
  border-bottom: 0rem;
}

.loginicon{
  bottom: 0rem;
}
</style>
