<template>
  <div class="WeatherShowCtrl">
  <yd-navbar :title="xmtitle">
        <router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
  </yd-navbar>
  <div style="height: 300px;">
    <yd-flexbox direction="vertical">
      <div>风力{{fengli}}</div>
      <div>风向{{fengxiang}}</div>
      <div>pm25{{pm25}}</div>
      <div>质量{{quality}}</div>
      <div>湿度{{shidu}}</div>
      <div>温度{{wendu}}</div>
      <div>更新时间{{updateTime}}</div>
    </yd-flexbox>
  </div>
  <yd-tab>
        <yd-tab-panel label="aa" v-for="weather in weathers">
          
        </yd-tab-panel>
  </yd-tab>
  <yd-accordion>
      <yd-accordion-item  v-for="zhishu in zhishus">
          <div slot="title" style="color:red">{{zhishu.name}}</div>
          <div style="padding: .24rem;">
              <p>{{zhishu.name}}</p>
              <p>{{zhishu.value}}</p>
              <p>{{zhishu.detail}}</p>
          </div>
      </yd-accordion-item>
  </yd-accordion>
  <!-- <div>一周天气状况{{weathers}}</div> -->
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('changeTitile', '天气状况')
    this.$dialog.loading.open('正在加载，请您耐心等待')
    let params = {}
    this.fetch.getWeather(params)
      .then(res => {
        if (res.status === 200) {
          let data = res.data
          this.fengli = data.fengli
          this.fengxiang = data.fengxiang
          this.pm25 = data.pm25
          this.quality = data.quality
          this.shidu = data.shidu
          this.wendu = data.wendu
          this.updateTime = res.rspTime
          this.weathers = data.weathers
          this.zhishus = data.zhishus
          this.$dialog.loading.close()
        } else {
          this.$dialog.alert({mes: res.message})
          this.$dialog.loading.close()
        }
      })
      .catch(error => {
        this.$dialog.alert({mes: error.data})
        this.$dialog.loading.close()
      })
  },
  data () {
    return {
      fengli: '',
      fengxiang: '',
      pm25: '',
      quality: '',
      shidu: '',
      wendu: '',
      updateTime: '',
      weathers: [],
      zhishus: [],
      images: []
    }
  },
  methods: {
    handleClick1 () {}
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
.swipperImage{
  height: 3.5rem;
}
.menu{
  width: .9rem;
  height: .9rem;
  border: 2px #fff solid; 
  -webkit-border-radius: 40px;
}
.demo-rollnotice{
  display: flex;
  -webkit-box-align:center;
  align-items:center;
  background-color:#FFF;
  padding:0 12px;
}
.demo-rollnotice img{
  width: 73px;
  height: 16px;
  margin-right: 4px;
}
</style>
