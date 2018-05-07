
<template>
  <div id="helpInfo">
    <div class="second" v-cloak>
      <!--面包屑-->
      <div class="help-nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><router-link to="/helpArray/helpOptions">常见问题</router-link></el-breadcrumb-item>
          <el-breadcrumb-item v-text="helpInfoName"></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--面包屑-->
      <div class="second-1024" v-html="helpInfoOption"></div>
      <p class="getBackCom"><router-link to="/helpArray/helpOptions"><button class="getBackComButton" round>返回</button></router-link></p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'helpInfo',
    data () {
      return {
        helpInfoName:'',
        helpInfoOption:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState'
      ]),
    },
    mounted () {
      var self = this;
      var helpInfo = JSON.parse(sessionStorage.getItem('helpInfo'));
      console.log(helpInfo)
      if(helpInfo == null){
        this.$router.push({path:'/helpArray/helpOptions'});
        return false;
      }
      this.helpInfoName = helpInfo.name;
      var data = {
        helpId:helpInfo.id
      };
      axios.post(self.getAPIState+'helpInfo', JSON.stringify(data))
        .then(function (obj) {
          var obj = obj.data.data;
          if(obj.result == '0'){
            self.helpInfoOption = obj.content;
          }
        }).catch(function (error) {
      });
    },
    methods: {
      ...mapActions([
      ]),
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .second {
    padding-top: 20px;
    text-align: center;
    background: #f0f5f7;
    width: 100%;
  }
  .second-1024 {
    text-align: left;
    box-sizing: border-box;
    padding: 20px 40px;
    background: #fff;
    margin: 0 auto;
    width: 1200px;
    /*height: 579px;*/
  }
  .second-1024 li:hover {
    color: #00bffe;
  }
  .second-1024 li {
    cursor: pointer;
    text-align: left;
    line-height: 53px;
    border-bottom: 1px dashed #ddd;
    font-size: 16px;
    color: #333;
  }
  .second-1024 a:last-child li {
    border: none;
  }
  .el-pagination {
    padding: 40px 60px;
  }
  .second .el-dialog, .el-pager li {
    background: none;
  }
  /*second*/
  /*详情*/
  .help-nav {
    margin: 20px auto;
    width: 1200px;
    background: #f0f5f7;
  }
  .el-breadcrumb__inner, .el-breadcrumb__inner a{
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }
  .help-nav .el-breadcrumb__item {
    font-size: 16px;
    color: #333;
  }
  .getBackCom {
    width: 1200px;
    overflow: hidden;
    margin: 20px auto 0;
    padding-bottom: 60px;
  }
  .getBackComButton {
    border-radius: 50px;
    border: 1px solid #ddd;
    background: #fff;
    margin-right: 40px;
    float: right;
    font-size: 14px;
    width: 80px;
    height: 36px;
  }
  .getBackComButton:hover {
    border-color: #00bffe;
    color: #00bffe;
  }
</style>

