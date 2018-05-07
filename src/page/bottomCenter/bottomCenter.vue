<template>
  <div class="bottomCenter">
    <bannerPic :banner="bannerList"></bannerPic>
    <div class="w1024px">
      <div class="personalNav left">
        <articlLeft :dataTitle="getNavListTitle[0]" :dataList="getNavList[0]"></articlLeft>
        <articlLeft :dataTitle="getNavListTitle[1]" :dataList="getNavList[1]"></articlLeft>
      </div>
      <div class="personalValue right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import bannerPic from '../../components/bannerPic/bannerPic.vue'
  import articlLeft from '../../components/articlLeft/articlLeft.vue'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'bottomCenter',
    data () {
      return {
        perTriangel:'',
        activityColor:'activityColor',
        bannerList:''
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB',
        'getNavList',
        'getNavListTitle',
        'getBannerCP',
      ]),
    },
    mounted () {

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
      articlLeft,
      bannerPic
    }
  }
</script>

<style scoped>
  .bottomCenter {
    overflow: hidden;
    background: #f0f5f7;
    height: auto;
    width: 100%;
  }
  .personalNav {
    width: 240px;
  }
  .personalValue {
    margin-bottom: 100px;
    background: #fff;
    width: 950px;
  }
  .w1024px {
    margin: 0 auto;
    padding-top: 20px;
    overflow: hidden;
    width: 1200px;
  }
</style>

