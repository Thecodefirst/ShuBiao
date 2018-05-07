<template>
  <div id="companyOptions">
    <p class="headerLine">
      <span v-text="dbList.name"></span>
    </p>
    <div class="div1024px">
      <div class="companyNameList">
        <li v-for="(item,index) in getCompanyOption.searchList">
          <p class="comCursor comCursorHover left" v-text="item.companyName"></p>
          <p class="comCursor left addMargin color999" v-text="item.label"></p>
          <p class="comCursor left color999" v-text="item.noticeName"></p>
          <p class="comCursor right color999" v-text="item.createDate"></p>
        </li>
      </div>
    </div>
    <!--搜索分页-->
    <div v-show="!getCompanyOption.counts == '0'" class="searchPage">
      <el-pagination
        @current-change="handleSizeChange"
        layout="prev, pager, next"
        :page-size='20'
        :total="getCompanyOption.counts">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'companyOptions',
    data () {
      return {
        dbList:'',
        totleLength:1,
        api:{
          total:'0',
          count:'20',
          id:'',
        }
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getUserDB',
          'getCompanyOption'
      ]),
    },
    mounted () {
      this.dbList = JSON.parse(sessionStorage.getItem('companyOptionsAPI'));
      this.api.id = this.dbList.id;
    },
    methods: {
      ...mapActions([
          'updateNoticeInfo',
          'updateCompanyDynamics',
          'updateSearchObject'
      ]),
      /*分页*/
      handleSizeChange(val) {
        this.api.total = JSON.stringify((val - 1) * 20);
        this.updateCompanyDynamics(this.api);
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  #companyOptions {
    background: #f0f5f7;
  }
  .headerLine {
    box-sizing: border-box;
    font-size: 24px;
    color: #333;
    margin: 0 auto;
    padding: 20px 0;
    width: 1200px;
  }
/*  .comCursorHover:hover {
    cursor: pointer;
    color: #00bffe;
  }*/
  .div1024px {
    margin: 0 auto;
    background: #fff;
    width: 1200px;
  }
  .div1024px li {
    overflow: hidden;
  }
  .companyNameList {
    color: #333;
    padding: 0 20px;
    border-top: 2px solid #f0f5f7;
  }
  .companyNameList li {
    border-bottom: 1px dashed #f0f5f7;
    font-size: 16px;
    line-height: 60px;
    overflow: hidden;
  }
  .companyNameList p:last-child {
    font-size: 14px;
  }
  .addMargin {
    margin: 0 10px;
  }
  .color999 {
    color: #999;
  }
  .searchPage {
    margin-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>

