<template>
  <div id="helpOptions">
    <div class="second" v-cloak>
      <div class="second-1024">
        <li v-for="(item,index) in problemDB" @click="goHelpInfo(item)">&nbsp;&nbsp;·&nbsp;&nbsp;{{ item.name }}</li>
      </div>
      <el-pagination
        @current-change="handleSizeChange"
        layout="prev, pager, next"
        :total="totleLength">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'helpOptions',
    data () {
      return {
        totleLength:200,
        problemDB:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getBannerCP',
        'getAPIState'
      ]),
    },
    mounted () {
      this.problemList(1);
    },
    methods: {
      ...mapActions([

      ]),
      /*常见问题初始化*/
      problemList:function(num){
        var self = this;
        var data = {
          total:JSON.stringify((num - 1) * 10),
          count:'10',
        };
        axios.post(self.getAPIState+'helpList', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.problemDB = obj.baseHelpList;
              self.totleLength = obj.counts;
            }
          }).catch(function (error) {
        });
      },
      /*分页*/
      handleSizeChange(val) {
        this.problemList(val);
      },
      goHelpInfo:function(item){
        sessionStorage.setItem('helpInfo',JSON.stringify(item));
        this.$router.push({path:'/helpArray/helpInfo'});
      },
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
    height: 579px;
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
    width: 1024px;
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
    width: 1024px;
    overflow: hidden;
    margin: 20px auto 0;
    padding-bottom: 60px;
  }
  .getBackCom .el-button {
    margin-right: 41px;
    float: right;
    padding: 10px 23px;
    font-size: 14px;
    background: #f5f5f5;
    width: 80px;
    height: 36px;
  }
</style>

