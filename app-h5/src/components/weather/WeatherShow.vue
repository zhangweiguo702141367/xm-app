<template>
  <div class="WeatherShowCtrl">
  <yd-navbar :title="xmtitle">
        <router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
  </yd-navbar>
  <div style="height: 5.5rem;padding-top:0.25rem;color: white">
    <yd-flexbox direction="vertical">
      <div class="weather_city"><span>{{city}}</span></div> 
      <div class="weather_wendu">
        <div class="currentwendu">{{wendu}}</div>
        <div class="updateTimes">
          <div class="wenduflag">。</div>
          <div class="updateTime">[{{updateTime}}更新]</div>
        </div>
      </div>   
      <div class="weatherdetail">
        <div class="weatherdetailleft">
          <div class="wetherdaytype"><!-- <img src="http://www.weather.com.cn/m/i/icon_weather/42x30/d00.gif" width="35px"> -->{{weathers[0].day_type}}</div>
        </div>
        <div class="weatherdetailright">
          <div>{{weathers[0].low.substr(3)}}<span>/</span>{{weathers[0].high.substr(3)}}</div>
        </div>
      </div> 
      <div class="weatherdesc">
        <span style="margin-right: .2rem">{{now}}</span>
        <span style="margin-right: .2rem">空气质量:{{quality}}</span>
        <span style="margin-right: .2rem">湿度:{{shidu}}</span>
        <span style="font-size: .25rem">来源中国天气网</span>
      </div>
    </yd-flexbox>
  </div>
  <div class="weatherecharts">
  <div class="fiveday" :class="{'borderwhite':inx==4?false:true}" v-for="(weather, inx) in weathers">
    <div>{{inx==0?'今日':weather.date.substr(3)}}</div>
    <div>{{weather.day_type}}</div>
    <div class="weathericon"><img src="http://www.weather.com.cn/m/i/icon_weather/42x30/d00.gif"></div>
    <div>{{weather.night_type}}</div>
    <div class="weathericon"><img src="http://www.weather.com.cn/m/i/icon_weather/42x30/d00.gif"></div>
    <div>{{weather.low.substr(3)}}</div>
    <div>{{weather.high.substr(3)}}</div>
    <div>{{weather.date.substr(0,3)}}</div>
    <div>{{weather.day_fengxiang}}</div>
    <div>{{weather.day_fengli}}</div>
  </div>
  <router-link to="/exponential">指数详情</router-link>
  </div>
  <!-- <yd-accordion>
      <yd-accordion-item  v-for="zhishu in zhishus">
          <div slot="title" style="color:red">{{zhishu.name}}</div>
          <div style="padding: .24rem;">
              <p>{{zhishu.name}}</p>
              <p>{{zhishu.value}}</p>
              <p>{{zhishu.detail}}</p>
          </div>
      </yd-accordion-item>
  </yd-accordion> -->
  <!-- <div>一周天气状况{{weathers}}</div> -->
  </div>
</template>

<script>
import {hm, monthday} from '@/config/util/storageutil'
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
          this.updateTime = hm(res.rspTime)
          this.weathers = data.weathers
          this.zhishus = data.zhishus
          this.city = data.city
          this.now = monthday()
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
      now: '',
      city: '',
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
.WeatherShowCtrl{
  height: 13.3rem;
  color: white;
  background:url("../../assets/images/weather/sun.jpg");
}
.yd-cell-left{
  margin-right: .4rem;
}
.yd-cell-right{
  padding-right:0.30rem;
}
.weather_city{
  line-height: 0.4rem;
  font-size: 0.4rem;
  color: white;
  text-align: left;
  margin-left: 0.4rem;
  width: 100%;
}
.weather_wendu{
  width: 100%;
  height: 2.5rem;
}
.weather_wendu .currentwendu{
    width: 60%;
    font-size: 1.8rem;
    text-align: right;
    float: left;
}
.weather_wendu .updateTimes{
  margin-left: 3%;
  width: 35%;
  height: 2.5rem;
  text-align: left;
  float: left;
}
.wenduflag{
  height: 1.6rem;
  font-size: 0.7rem;
}
.weatherdetail{
  height: 1.6rem;
  width: 100%;
  font-size: .35rem; 
}
.weatherdetailleft{
  width: 55%;
  float: left;
}
.weatherdetailright{
  width: 40%;
  float: left;
  text-align: left;
}
.wetherdaytype{
  padding-right: 0.2rem;
  text-align: right;
}
.weatherdesc{
  padding-top: .5rem;
  height: 2.8rem;
  width: 100%;
  font-size: .30rem;
  border-bottom:1px solid white; 
}
.fiveday{
  width: 20%;
  font-size: .3rem;
  text-align: center;
  float: left;
}
.borderwhite{
  border-right: 1px solid white;
}
.weatherecharts{
  padding-top: 0.3rem;
}
.weathericon{
  padding-left: 18%;
}
.fiveday div{
    padding-bottom: 0.1rem;
}

</style>
