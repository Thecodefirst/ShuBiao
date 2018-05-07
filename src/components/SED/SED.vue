<template>
  <!--pic-->
  <div v-show="!firmListDB.length == '0'" class="SED-title">
    <div class="borderBottom" v-for="(item,index) in firmListDB">
      <div style="overflow: hidden">
        <p class="companyName left" v-text="item.name"></p>
        <p class="companyBtn right">
          <!--<router-link to="/businessCard"><el-button type="primary" round>企业名片</el-button></router-link>-->
          <el-button @click="businessCard(item.firmId)" type="primary" round>企业名片</el-button>
        </p>
      </div>
      <div class="SED-com-div">
        <li>
          <span>法人代表</span>：
          <span v-text="item.legalPerson"></span>
        </li>
        <li>
          <span>注册时间</span>：
          <span v-text="item.registerDate"></span>
        </li>
        <li>
          <span>注册资本</span>：
          <span v-text="item.registerCapital"></span>
        </li>
      </div>
      <div class="SED-com-div">
        <li>
          <span>联系电话</span>：
          <span v-text="item.telephone"></span>
        </li>
        <li>
          <span>邮箱</span>：
          <span v-text="item.email"></span>
        </li>
        <li>
          <span>公司地址</span>：
          <el-tooltip :content="item.address" placement="bottom" effect="light">
            <span v-text="item.address"></span>
          </el-tooltip>
        </li>
      </div>
      <div class="SED-com-div add-SED-color">
        <li v-text="item1" v-for="(item1,index) in item.range"></li>
      </div>
    </div>
  </div>
  <!--pic-->
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    props:{
      noticeOptionId:'',
    },
    name: 'SED',
    data () {
      return {
        dataList:[
            {
              companyName:'上海浦东城市建设投资有限责任公司',
              name:'张桂玉',
              r_time:'1989-07-02',
              r_money:'120000万人民币',
              tel:'021-50113327',
              email:'xiuzouzhi@shpdg.com',
              comAddress:'中国(上海)自由贸易试验区浦明路1229号-8楼',
              classObj:['装饰','土木工程建筑','计算机系统集成','钢结构工程总承包业务及工程设计'],
            },
            {
              companyName:'上海东浦城市建设发展有限公司',
              name:'袁正耕',
              r_time:'1993-01-30',
              r_money:'1500万人民币',
              tel:'021-56700555',
              email:'shdpjs@126.com',
              comAddress:'上海市虹口区大连西路617号13楼1室',
              classObj:['投资管理','土木工程建筑','市政工程施工','房屋修理','室内装潢'],
            },
            {
              companyName:'上海广豪建筑实业有限公司',
              name:'袁正耕',
              r_time:'1997-07-172',
              r_money:'4500万人民币',
              tel:'02159527240',
              email:'wcy428@126.com',
              comAddress:'广东省珠海市津西路569号',
              classObj:['市政工程','金属材料','建筑业务咨询','销售建材','水利水电工程施工总承包'],
            },
            {
              companyName:'上海外高桥建筑安装发展公司',
              name:'廖渠勤',
              r_time:'1994-12-20',
              r_money:'2000万人民币',
              tel:'02165800201',
              email:'waijianan@163.com',
              comAddress:'上海市崇明县竖新镇团城公路1358号21幢301室',
              classObj:['装饰','设计','冷暖设备','建筑工程','施工'],
            },
            {
              companyName:'中国葛洲坝集团股份有限公司',
              name:'聂凯',
              r_time:'1997-05-21',
              r_money:'46.05亿元',
              tel:'027-59271000',
              email:'wsc2008@cggc.cn',
              comAddress:'武汉市解放大道558号葛洲坝大酒店',
              classObj:['能源','施工','建筑工程承包','水泥生产销售','高新技术产业'],
            },
          ],
        firmListDB:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
      ]),
    },
    mounted () {
      this.firmList();
    },
    methods: {
      ...mapActions([
          'updateCompanyOptions'
      ]),
      /*初始化企业推荐*/
      firmList:function(){
        var self = this;
        axios.post(self.getAPIState+'firmList',JSON.stringify({noticeId:''}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.firmListDB = obj.firmList;
            }
          }).catch(function (error) {
        });
      },
      /*跳转企业名片*/
      businessCard:function(id){
        this.updateCompanyOptions({ firmId:id });
      },
    },
    components:{
      axios,
    }
  }
</script>

<style>
  .SED {
    box-sizing: border-box;
    padding: 30px 20px;
    background: #fff;
    width: 910px;
  }
  .SED-title {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  .companyName {
    font-size: 18px;
    color: #333;
  }
  .companyBtn .el-button {
    border-color: #00bffe;
    background: #00bffe;
    padding: 0;
    width: 84px;
    height: 26px;
  }
  .SED-com-div {
    margin-top: 12px;
    overflow: hidden;
    font-size: 14px;
    color: #999;
  }
  .SED-com-div li {
    float: left;
  }
  .SED-com-div li span:first-child {
    vertical-align: middle;
    display: inline-block;
    width: 60px;
  }
  .SED-com-div li span:last-child {
    vertical-align: middle;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
    width: 200px;
  }
  .add-SED-color {
    color: #00bffe !important;
  }
  .add-SED-color li {
    border-right: 2px solid #00bffe;
    box-sizing: border-box;
    padding: 0 20px;
    color: #00bffe !important;
  }
  .add-SED-color li:first-child {
    padding-left: 0;
  }
  .add-SED-color li:last-child {
    border-right: none;
  }
  .borderBottom {
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dfdfdf;
  }
  .SED-title .borderBottom:first-child {
    padding-top: 0;
  }
  .SED-title .borderBottom:last-child {
    border-bottom: none;
  }
  .otherList {
    margin-top: 30px;
  }
  .searchTips {
    box-sizing: border-box;
    padding-left: 20px;
  }
</style>

