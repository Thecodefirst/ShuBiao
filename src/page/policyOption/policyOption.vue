<template>
  <div class="policyOption">
    <div class="w1024">
      <div @click="collectPro" class="collect">
        <span class="collectPic">
          <img class="imgCom" :src=" getMatchList.collect ? star_blue : star_gray " alt="收藏">
        </span>
        <span :class=" getMatchList.collect ? collectTextHover : '' " class="collectText right" v-text="getMatchList.collectText"></span>
      </div>
      <el-tooltip :content="getMatchList.name" placement="bottom" effect="light">
        <P class="policyTitle addCSSover" v-text="getMatchList.name"></P>
      </el-tooltip>
      <div class="policySecond">
        <div class="policySecondNav">
          <div class="left">
            <span>
              <el-button v-if="getMatchList.infoTypeMin == '1'" type="danger" size="mini" round v-text="getMatchList.infoTypeMinName"></el-button>
              <el-button v-else-if="getMatchList.infoTypeMin == '2'" type="success" size="mini" round v-text="getMatchList.infoTypeMinName"></el-button>
              <el-button v-else-if="getMatchList.infoTypeMin == '3'" type="warning" size="mini" round v-text="getMatchList.infoTypeMinName"></el-button>
            </span>
            <span>
              <el-button @click="proAreaClick1(getMatchList.industry)" type="primary" size="mini" round v-text="getMatchList.industryName"></el-button>
            </span>
          </div>
          <p class="sourceNT"><span>来自：{{ getMatchList.sourceName }}</span><span v-text="getMatchList.releaseDate"></span></p>
          <span @click="searchAll(getMatchList.name)" class="searchAll right">搜全网</span>
        </div>
        <div class="policyContent" v-html="getMatchList.content"></div>
      </div>
      <P class="policyTitle">相关文章</P>
      <div class="related">
        <li v-for="(item,index) in getPolicyList">
          <el-tooltip :content="item.name" placement="top" effect="light">
            <p @click="matchClick(item.id,1)" class="addCSSover left" v-text="item.name"></p>
          </el-tooltip>
          <p class="color999 right" v-text="item.releaseDate"></p>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import star_gray from '../../assets/img/star_gray.png'
  import star_blue from '../../assets/img/star_blue.png'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'policyOption',
    data () {
      return {
        collect:false,
        collectText:'收藏',
        star_gray:star_gray,
        star_blue:star_blue,
        collectTextHover:'collectTextHover',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB',
        'getMatchList',
        'getPolicyList'
      ]),
    },
    mounted () {
      this.updateNavListIndex(4);
    },
    methods: {
      ...mapActions([
        'update_Search',
        'updateMatchList',
        'updatePolicyObject',
        'updateNavListIndex'
      ]),
      searchAll:function(value){
        var url = 'http://www.baidu.com/s?wd=' + value;
        window.open(url);
      },
      proAreaClick1:function(val){
        this.updatePolicyObject({total:'0',industry:val})
        this.$router.push({path:'/policy'})
      },
      collectPro:function(){
        var self = this;
        var data = {
          type:'1',
          userId:self.getUserDB.userId,
          id:self.getMatchList.id
        }
        axios.post(self.getAPIState+'addCollect', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.recordHistory(self.getMatchList.id,'1',self.getUserDB.userId);
              self.updateMatchList({id:self.getMatchList.id,userId:self.getUserDB.userId});
            }
          }).catch(function (error) {
        });
      },
      matchClick:function(id,type){
        window.scrollTo(0,0);
        this.recordHistory(id,type,this.getUserDB.userId);
        this.updateMatchList({id:id,userId:this.getUserDB.userId});
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .policyOption {
    background: #f0f5f7;
  }
  .w1024 {
    position: relative;
    padding-bottom: 78px;
    margin: 0 auto;
    width: 1200px;
  }
  .policyTitle {
    color: #333;
    font-size: 24px;
    padding-top: 30px;
    padding-bottom: 20px;
    width: 1000px;
  }
  .policySecond {
    box-sizing: border-box;
    padding: 20px 20px 60px;
    background: #fff;
    width: 1200px;
  }
  .policySecondNav {
    overflow: hidden;
  }
  .sourceNT {
    line-height: 25px;
    display: inline-block;
    overflow: hidden;
  }
  .sourceNT span {
    font-size: 14px;
    color: #999;
  }
  .sourceNT span:first-child {
    margin-left: 20px;
  }
  .sourceNT span:last-child {
    margin-left: 25px;
  }
  .searchAll {
    cursor: pointer;
    font-size: 14px;
    color: #999;
  }
  .searchAll:hover {
    color: #00bffe;
  }
  .policyContent {
    margin-top: 20px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
  }
  .related {
    background: #fff;
  }
  .related li {
    cursor: pointer;
    overflow: hidden;
    font-size: 16px;
    color: #333;
    margin: 0 auto;
    padding: 20px 0;
    border-bottom: 1px dashed #ddd;
    width: 1158px;
  }
  .related li:last-child {
    border-bottom: none;
  }
  .related li p:first-child {
    width: 800px;
  }
  .related li:hover {
    color: #00bffe;
  }
  .color999 {
    color: #999;
  }
  .collect {
    position: absolute;
    top: 40px;
    right: 0;
    cursor: pointer;
    display: inline-block;
  }
  .collectPic {
    margin-right: 4px;
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .collectText {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #999;
  }
  .collectTextHover {
    color: #00bffe !important;
  }
</style>

