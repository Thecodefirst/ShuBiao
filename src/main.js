// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import baseCSS from './base.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueStar from 'vue-star'

Vue.component('VueStar', VueStar)

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { baseCSS,axios }
})

Vue.prototype.moment = require('moment');

/*行为记录*/
Vue.prototype.recordHistory = function(id,type,userId){
  var data = {
    id:id,
    type:JSON.stringify(type),
    userId:userId,
  };
  axios.post('http://shubiao.71hulian.com/f/recordHistory', JSON.stringify(data)).then(function (obj) {}).catch(function (error) {});
}

Vue.prototype.arrayString = function(arr){
  console.log(arr);
  var arrString="";
  for(var i = 0 ; i < arr.length ; i++ ){
    if(!arr[i] == ""){
      arrString += arr[i] + '|'
    }
  }
  return arrString;
}
Vue.prototype.arrayObject = function(arr){
  var arrObject="";
  if(!arr.length == 0){
    for(var i = 0 ; i < arr.length ; i++ ){
      arrObject += arr[i].value + '|'
    }
    return arrObject;
  }
}
Vue.prototype.fmtDate = function(obj) {
  if (obj !== "") {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
  } else {
    return "";
  }
}

Vue.prototype.parserDate = function (date) {
  var t = Date.parse(date);
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, "/")));
  } else {
    return new Date();
  }
};
/*  X  */
Vue.prototype.accMul = function (arg1,arg2){
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
};
/*  + */
Vue.prototype.accAdd = function(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
};
/* - */
Vue.prototype.Subtr = function(arg1,arg2){
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  //动态控制精度长度
  n=(r1>=r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
}
/*  /   */
Vue.prototype.accDiv = function(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  r1=Number(arg1.toString().replace(".",""))
  r2=Number(arg2.toString().replace(".",""))
  return (r1/r2)*Math.pow(10,t2-t1);
}


