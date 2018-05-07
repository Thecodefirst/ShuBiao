<template>
  <div style="margin-bottom: 10px;overflow: hidden">
    <div class="personalNav left">
      <p class="per-Nav-title">
        <span v-text="dataTitle.cn"></span>
        <span style="margin: 0 2px">/</span>
        <span v-text="dataTitle.en"></span>
      </p>
      <div class="per-list-value">
        <li :class="{ activityColor : getNavIndex == item.value }" v-for="(item,index) in dataList" @click="perClick(item.value,item.linked)">
          <div v-show="getNavIndex == item.value" class="triangel"></div>
          <span v-text="item.name"></span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    props:{
      dataList:'',
      dataTitle:'',
    },
    name: 'articl',
    data () {
      return {
        perTriangel:'10',
        activityColor:'activityColor',
        bannerCP:{
          chinese:'常见问题',
          english:'Common problem',
          urlPic:'../../../static/problem_bg.jpg',
        },
        bannerAU:{
          chinese:'关于我们',
          english:'About us',
          urlPic:'../../../static/copyright_bg.jpg',
        },
        bannerCS:{
          chinese:'版权声明',
          english:'Copyright statement',
          urlPic:'../../static/copyright_bg.jpg',
        },
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getNavIndex'
      ]),
    },
    mounted () {

    },
    methods: {
      ...mapActions([
          'updateNavIndex',
          'updateBanner'
      ]),
      perClick:function(index,lined){
       /* if(index == '0'||index == '1'){
          this.updateBanner(this.bannerAU);
        }else if(index == '2'||index == '3'){
          this.updateBanner(this.bannerCS);
        }*/
        this.updateNavIndex(index)
        this.$router.push({path:lined});
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .personalNav {
    background: #fff;
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
    background: #fff;
    width: 950px;
  }
</style>

