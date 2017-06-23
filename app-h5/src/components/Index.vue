<template>
  <div class="IndexCtrl">
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="(imageObject,idx) in images">
        <a :href="imageObject.gourl">
          <img :src="imageObject.imageurl" class="swipperImage">
        </a>
      </yd-slider-item>
    </yd-slider>
    <yd-grids-group :rows="5">
        <yd-grids-item v-for="n in 10" link="/weatherShow">
            <img slot="icon" src="../assets/images/xm.jpg" class="menu">
           <span slot="text">image</span>
        </yd-grids-item>
    </yd-grids-group>
    <div class="demo-rollnotice"><img src="//st.360buyimg.com/m/images/index/jd-news-tit.png">
      <yd-rollnotice autoplay="2000">
          <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>荣耀V9 3月超级钜惠！</yd-rollnotice-item>
          <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>3.23京东超级品牌日格力盛典</yd-rollnotice-item>
          <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>京东服饰 早春新品低至7折</yd-rollnotice-item>
      </yd-rollnotice>
    <yd-tabbar fixed=true>
        <yd-tabbar-item title="首页" link="#">
            <yd-icon name="home-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="#" dot>
            <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="#" active>
            <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
            <yd-badge slot="badge" type="danger">2</yd-badge>
        </yd-tabbar-item>
    </yd-tabbar>  
    </div>
    <!--  <vue-star animate="animated rubberBand" color="#F05654">
      <a slot="icon" class="fa fa-heart" @click="handleClick1"></a>
    </vue-star> -->
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('changeTitile', '首页展示')
    this.images = [{gourl: 'http://www.ydcss.com', imageurl: 'http://static.ydcss.com/uploads/ydui/1.jpg'},
                   {gourl: 'http://www.ydcss.com', imageurl: 'http://static.ydcss.com/uploads/ydui/2.jpg'},
                   {gourl: 'http://www.ydcss.com', imageurl: 'http://static.ydcss.com/uploads/ydui/3.jpg'}]
    this.menus = [{menuimage: '', menulink: '/weather', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''},
                  {menuimage: '', menulink: '', menutext: ''}]
  },
  data () {
    return {
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
