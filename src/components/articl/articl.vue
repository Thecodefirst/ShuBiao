<template>
  <!--pic-->
  <div class="articl">
    <p class="articl-title">
      <span :class="{ colorAdd: 0 == indexNum }" v-text="dataList[0].name" @mouseover="tabNavClick(dataList[0].value,0)"></span>
      <span :class="{ colorAdd: 1 == indexNum }" v-text="dataList[1].name" @mouseover="tabNavClick(dataList[1].value,1)"></span>
    </p>
    <div class="articl-li">
      <li @click="matchClick(item.id,1)" v-for="(item,index) in articlList" v-text="item.name"></li>
    </div>
    <li class="more addBorder">
      <router-link :to="linked" class="more-font">+ 查看更多</router-link>
    </li>
  </div>
  <!--pic-->
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    props:{
      dataList:'',
      linked:'',
      noticeOptionId:'',
    },
    name: 'articl',
    data () {
      return {
        indexNum:0,
        colorAdd:'colorAdd',
        articlList:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getIsLogin',
          'getUserDB'
      ]),
    },
    mounted () {
        this.tabNavClick(this.dataList[0].value,0);
    },
    methods: {
      ...mapActions([
          'updateMatchList',
          'updateShowDrawOFF',
          'updateNavListIndex'
      ]),
      test:function(index){
          alert(index);
      },
      matchClick:function(id,type){
        var self = this;
        self.updateNavListIndex(4);
        if(self.getIsLogin){
          this.recordHistory(id,type,this.getUserDB.userId);
          this.updateMatchList({id:id,userId:this.getUserDB.userId});
        }else{
          self.updateShowDrawOFF(true);
        }
      },
      tabNavClick:function(index,num){
        var self = this;
        self.indexNum = num;
        axios.post(self.getAPIState+'relatedPolicyList', JSON.stringify({type:index,noticeId:self.noticeOptionId,}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.articlList = obj.policyList;
            }
          }).catch(function (error) {
        });
      }
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .articl {
    background: #fff;
    width: 280px;
  }
  .articl-title {
    overflow: hidden;
    border-bottom: 1px solid #f5f5f5;
    font-size: 16px;
    color: #aaa;
  }
  .articl-title span {
    cursor: pointer;
    margin: 20px 0;
    text-align: center;
    float: left;
    display: inline-block;
    width: 140px;
  }
  .articl-title span:first-child {
    box-sizing: border-box;
    border-right: 1px solid #aaa;
  }
  .articl-title span:last-child {
    box-sizing: border-box;
  }
  .articl-title span:hover {
    color:#00bffe;
  }
  .articl-li {
    padding: 20px;
    box-sizing: border-box;
  }
  .articl-li li {
    padding-top: 20px;
    cursor: pointer;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #333;

  }
  .articl-li li:first-child {
    padding-top: 0;
  }
  .articl-li li:hover {
    color: #00bffe;
  }
  .addBorder {
    text-align: center;
    padding: 16px 0px;
    border-top: 2px solid #f5f5f5;
  }
  .colorAdd {
    color: #00bffe;
  }
</style>

