<template>
  <div class="personalCenter">
    <div class="w1024px">
      <!--导航NAV-->
      <div class="left" :class=" personalConOFF ? 'personalNavT' : 'personalNav'" >
        <p class="per-Nav-title">
          <span>个人中心</span>
          <span style="margin: 0 2px">/</span>
          <span>Personal center</span>
        </p>
        <div class="per-list-value">
          <li :class="{ activityColor : perTriangel == index }" v-for="(item,index) in navList" @click="perClick(index,item.linked)">
            <div v-show="perTriangel == index" class="triangel"></div>
            <span v-text="item.name"></span>
          </li>
        </div>
      </div>
      <div class="personalValue right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'personalCenter',
    data () {
      return {
        perTriangel:'',
        navList:[
          {
              name:'企业认证',
              value:'0',
              linked:'/personalCenter/Certification',
            },
            {
              name:'推送管理',
              value:'1',
              linked:'/personalCenter/pushContents',
            },
            {
              name:'账号设置',
              value:'2',
              linked:'/personalCenter/accountSettings',
            }
          ],
        activityColor:'activityColor',
        personalConOFF:false,
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB'
      ]),
    },
    mounted () {
      var self = this;
      this.perClick('0','/personalCenter/Certification');
      window.addEventListener('scroll', function(){
        self.personalConOFF = window.scrollY > 200 ? true : false;
      });
    },
    methods: {
      ...mapActions([
        'update_Search'
      ]),
      perClick:function(index,lined){
        this.perTriangel = index;
        this.$router.push({path:lined});
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .personalCenter {
    background: #f0f5f7;
    height: auto;
    width: 100%;
  }
  .personalCenterT {
  }
  .w1024px {
    position: relative;
    margin: 0 auto;
    padding-top: 10px;
    overflow: hidden;
    width: 1200px;
  }
  .personalNav {
    background: #fff;
    width: 240px;
  }
  .personalNavT {
    top: 90px;
    background: #fff;
    position: fixed;
    width: 240px;
  }
  .per-Nav-title {
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    width: 200px;
  }
  .per-Nav-title span {
    padding: 20px 0;
    display: inline-block;
  }
  .per-Nav-title span:first-child {
    font-size: 16px;
    color: #333;
  }
  .per-Nav-title span:last-child {
    font-size: 12px;
    color: #333;
  }
  .per-list-value {
    padding: 20px;
  }
  .per-list-value li {
    font-size: 14px;
    cursor: pointer;
    position: relative;
    margin-bottom: 20px;
  }
  .per-list-value span {
    margin-left: 30px;
    display: inline-block;
  }
  .triangel {
    display: inline-block;
    border-style: solid;
    border-width: 5px 0px 5px 5px;
    border-color: transparent transparent transparent #00bffe;
    width: 0px;
    height: 0px;
  }
  .activityColor {
    color: #00bffe;
  }
  .personalValue {
    margin-bottom: 60px;
    background: #fff;
    width: 950px;
  }
</style>

