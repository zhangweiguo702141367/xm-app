<template>
  <div class="LoginCtrl">
    
  </div>
</template>

<script>
import {getCurrentPositionByIP} from '../../service/getData'
export default {
  created () {
    this.$store.dispatch('changeTitile', 'QQ登录')
    let res = getCurrentPositionByIP()
    console.debug([...res])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
