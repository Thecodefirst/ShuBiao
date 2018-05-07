<template>
  <div class="pushContents">
    <div class="Certification-title">
      <p>推送管理</p>
      <p>Push management</p>
    </div>
    <div class="spanList">
      <p class="spanList-title">填写的越详细，数据越精确！</p>
      <div class="spanList-array">
        <div v-for="(item,index) in spanList">
          <el-tooltip class="item" effect="light" :content="item.name" placement="top">
            <li @mouseenter="mouseenterCLick(index)" @mouseleave="mouseleaveClick(index)" @click="addSpanIndex(index)" :class='{ activitySpan : item.state == "0" }'>
                <span @click.stop="deleteSpan(index)" v-show="index == deleteShowIndex" class="spanDelete">
                  <img class="imgCom" src="../../../static/X.png" alt="关闭">
                </span>
                <p class="spanList-array-p" v-text="item.name"></p>
            </li>
          </el-tooltip>
        </div>
      </div>
      <p class="spanList-title">不想找？直接输入关键字，让推送更精确！</p>
      <div class="addSpanList">
        <li>
          <el-input :maxlength="8" v-model="spanInput" placeholder="请输入关键字"></el-input>
        </li>
        <li>
          <button @click="sublimeClick">+添加关键字</button>
        </li>
      </div>
      <div class="submitSpan">
        <button @click="submitALL">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'pushContents',
    data () {
      return {
        deleteShowIndex:'adus',
        activitySpan:'activitySpan',
        spanInput:'',
        spanList:[],
        dbPUSH:'',
        arr:[],
        arr1:[],
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getSearch',
          'getIsLogin',
          'getUserDB'
      ]),
    },
    mounted () {
        this.initDB();
    },
    methods: {
      ...mapActions([
          'update_Search'
      ]),
      /*删除标签*/
      deleteSpan:function(index){
        this.spanList.splice(index, 1);
        this.addSpanList("标签删除成功");
      },
      /*数据初始化*/
      initDB:function(){
        var self = this;
        axios.post(self.getAPIState+'pushManagement',JSON.stringify({userId:self.getUserDB.userId}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.dbPUSH = obj.pushManagement[0];//数据源
              self.DBproject(obj.pushManagement[0]);//调用重构
            }
          }).catch(function (error) {
        });
      },
      /*改变标签状态*/
      addSpanIndex:function(index){
          if(this.spanList[index].state == '0'){
            this.spanList[index].state = '1';
          }else{
            this.spanList[index].state = '0';
          }
      },
      /*提交全部*/
      submitALL:function(){
        this.addSpanList("提交成功");
      },
      /*添加标签*/
      sublimeClick:function(){
        var self = this;
        if(self.spanInput == ''){
            return false;
        }
        for(var i=0;i<self.spanList.length;i++){

            if(self.spanList[i].name == self.spanInput){
              self.$message({
                showClose: true,
                message: '请不要添加重复标签',
                type: 'warning'
              });
              return false;
            }
        }
        alert(111);
        self.spanList.push({name:self.spanInput, state:'1',})
        self.addSpanList("标签添加成功");
      },
      /*添加标签*/
      addSpanList:function(value){
        var self = this;
        var pushid;
        if(typeof(self.dbPUSH) == undefined || self.dbPUSH == 'undefined'){
          pushid = '';
        }else{
          pushid = self.dbPUSH.id;
        }

        self.arr = [];
        self.arr1 = [];

        for(var i=0;i<self.spanList.length;i++){
          self.arr.push(self.spanList[i].name);
          if(self.spanList[i].state =='0'){
            self.arr1.push(self.spanList[i].name);
          }
        }

        var keywords = this.arrayString(self.arr);
        var checkwords = this.arrayString(self.arr1);

        var data = {
          keywords:keywords,
          checkwords:checkwords,
          id:pushid,
          companyId:self.getUserDB.userId,
        }

        axios.post(self.getAPIState+'operationLabel',JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.$message({
                showClose: true,
                message: value,
                type: 'success'
              });
            }
          }).catch(function (error) {
        });
      },


      /*数据重构*/
      DBproject:function(val){
        var self = this;
        var newArray = [];
        var checkwords = val.checkwords;//选中列表
        var keywords = val.keywords;//标签列表
        if(keywords[0] == ''){
            return false;
        }
        for(var i=0;i<keywords.length;i++){
          newArray.push({
            name:keywords[i],
            state:'1',
          })
        }
        for(var i=0;i<newArray.length;i++){
           for(var t=0;t < checkwords.length;t++){
             if(newArray[i].name == checkwords[t]) {
               newArray[i].state = '0';
             }
           }
        }
        console.log(newArray);
        this.spanList = newArray;
      },
      mouseenterCLick:function(index){
        this.deleteShowIndex = index;
      },
      mouseleaveClick:function(){
        this.deleteShowIndex = 'adus';
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .pushContents {
    box-sizing: border-box;
    padding: 40px;
    background: #fff;
    width: 910px;
  }
  .Certification-title {
    padding-bottom: 60px;
    text-align: center;
  }
  .Certification-title p:first-child {
    font-size: 18px;
    color: #333;
  }
  .Certification-title p:last-child {
    font-size: 14px;
    color: #999;
  }
  .spanList {

  }
  .spanList-title {
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
  }
  .spanList-array {
    overflow: hidden;
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid #ddd;
  }
  .spanList-array li {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: .5s;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
    text-align: center;
    float: left;
    width: 140px;
    height: 50px;
  }
  .spanList-array li:hover {
    border-color: #1e2b40;
    color: #1e2b40;
    cursor: pointer;
  }
  .addSpanList {
    overflow: hidden;
  }
  .addSpanList li {
    margin-right: 10px;
    float: left;
  }
  .addSpanList .el-input {
    width: 200px;
  }
  .addSpanList button {
    transition: .5s;
    border-radius: 5px;
    border: 1px solid #00bffe;
    background: rgba(0,0,0,0);
    font-size: 14px;
    color: #00bffe;
    width: 120px;
    height: 50px;
  }
  .addSpanList button:hover {
    color: #1e2b40;
    border-color: #1e2b40;
  }
  .submitSpan {
    margin-top: 60px;
    text-align: center;
  }
  .submitSpan button {
    transition: .5s;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    background: #00bffe;
    width: 340px;
    height: 50px;
  }
  .submitSpan button:hover {
    background: #1e2b40;
  }
  .activitySpan {
    color: #00bffe !important;
    border-color: #00bffe !important;
  }
  .spanDelete {
    top: 0;
    right: 3px;
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
  }
  .spanList-array-p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 50px;
  }
</style>

