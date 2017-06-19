<template>
  <div class="EmailCtrl">
     <yd-navbar :title="xmtitle">
        <router-link to="/login" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <div class="emailbody">
      <div class="">邮件已发送,请您前往激活,并修改您的登录密码</div>
      <div>如您还有其他问题请，填写下面信息</div>
      <div>我们将在一个工作日内给您回复</div>
      <label class="emailtitle">咨询标题</label>
      <yd-cell-group>
          <yd-cell-item>
              <yd-input slot="right" v-model="title" required :showSuccessIcon="false" :showErrorIcon="false" regex="mobile" placeholder="请输入标题"></yd-input>
          </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="咨询内容">
        <yd-cell-item>
            <yd-textarea slot="right" placeholder="请详细说明您遇到的问题" maxlength="100"></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button-group>
        <yd-button size="large" @click.native="handleClick" type="disabled">问题提交</yd-button>
    </yd-button-group>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('changeTitile', '邮件发送成功')
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    handleClick () {
    }
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
.emailbody{
  margin-left: 5%;
  width: 90%;
  height: 0.9rem;
}
.emailtitle{
  text-align: left;
}
</style>
