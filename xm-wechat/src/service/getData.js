import Axios from 'axios'
var getCurrentPositionByIP = () => {
  let url = 'http://api.map.baidu.com/location/ip?ak=5wim9Xj10uGHkX2as8td5IcalCyGdmb2'
  return Axios.get(url) // 使用百度定位API,使用时将注释去掉，自己申请百度AK
}
export {getCurrentPositionByIP}
