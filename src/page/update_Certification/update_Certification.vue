<template>
  <div class="Certification" v-loading="loading">
    <!--dialog-->
    <el-dialog
      title="选择行业"
      :visible.sync="centerDialogVisible"
      width="800px"
      center>
        <div style="height: 410px;overflow-y: scroll">
          <el-checkbox-group v-model="checkList" @change="testCheckGroup">
            <div style="overflow: hidden" v-for="(item,index) in selectIndustryList">
              <p class="chooseTitle" v-text="item.name"></p>
              <li class="chooseLi left" :key="value.id" v-for="value in item.cIndustryList">
                <el-checkbox :label="value.id"><p class="chooseText">{{ value.name }}</p></el-checkbox>
              </li>
            </div>
          </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">提 交</el-button>
      </span>
    </el-dialog>
    <!--dialog-->
    <div class="Certification-title">
      <p>企业认证</p>
      <p>Enterprise certification</p>
    </div>
    <div class="data-perfection">
      <li>
        <span class="data-p-text left">资料完善情况</span>
        <p class="marginTop15 left">
          <el-rate
            v-model="valueNum"
            disabled
            show-score
            :colors="['#b4bccc','#00bffe','#00bffe']"
            text-color="#00bffe"
            :score-template="valueText">
          </el-rate>
        </p>
        <p class="data-p-tip left">(*完善信息会增加试用期)</p>
      </li>
      <li>
        <span class="data-p-text left">企业全称</span>
        <p  class="com-text-data comwidth340px left" v-text="getPersonalDB.name"></p>
      </li>
      <li>
        <span class="data-p-text left">法定代表人</span>
        <p  class="com-text-data comwidth340px left" v-text="getPersonalDB.legalPerson"></p>
      </li>
      <li>
        <span class="data-p-text left">注册资本</span>
        <p class="comwidth340px">
          <el-input v-model="registerCapital" placeholder="企业注册资金：（万元）"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">成立时间</span>
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </li>
      <li>
        <span class="data-p-text left">经营状态</span>
        <el-select v-model="operatingState" placeholder="请选择经营状态">
          <el-option key="运营" value="运营" label="运营"></el-option>
          <el-option key="整顿" value="整顿" label="整顿"></el-option>
        </el-select>
      </li>
      <li>
        <span class="data-p-text left">统一社会信用代码</span>
        <p class="comwidth340px">
          <el-input v-model="creditCode" placeholder="请输入内容"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">纳税人识别号</span>
        <p class="comwidth340px">
          <el-input v-model="taxCode" placeholder="请输入内容"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">注册号</span>
        <p class="comwidth340px">
          <el-input v-model="registerCode" placeholder="请输入内容注册号"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">组织机构代码</span>
        <p class="comwidth340px">
          <el-input v-model="organizationCode" placeholder="请输入组织机构代码"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">公司类型</span>
        <el-select v-model="enterpriseForms" placeholder="请选择公司类型">
          <el-option key="IT" value="IT" label="IT"></el-option>
        </el-select>
      </li>
      <li>
        <span class="data-p-text left">企业规模</span>
        <el-select @visible-change="chooseSelect" v-model="companyScale" placeholder="请选择">
          <el-option v-for="(item,index) in companyScaleList" :key="item.companyScaleLabel" :label="item.companyScaleLabel" :value="item.companyScaleValue">
          </el-option>
        </el-select>
      </li>
      <li>
        <span class="data-p-text left">营业期限</span>
        <el-date-picker
          v-model="timeList"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </li>
      <li>
        <span class="data-p-text left">登记机关</span>
        <p class="comwidth340px">
          <el-input v-model="registerUnit" placeholder="请输入登记机关"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">核准日期</span>
        <p class="comwidth340px">
          <el-input v-model="timeApproval" placeholder="请输入核准日期"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">英文名</span>
        <p class="comwidth340px">
          <el-input v-model="nameEnglish" placeholder="请输入英文名"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">曾用名</span>
        <p class="comwidth340px">
          <el-input v-model="nameUsed" placeholder="请输入曾用名"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">所属地区</span>
        <el-cascader
          v-model="elCascader"
          @change="handleChange"
          :options="proList"
          @active-item-change="handleItemChange"
          :props="props"
        ></el-cascader>
      </li>
      <li>
        <span class="data-p-text left">所属行业</span>
        <el-button @click="centerDialogVisible = true">+选择行业</el-button>
      </li>
      <li>
        <span class="data-p-text left">企业地址</span>
        <p class="comwidth340px">
          <el-input v-model="address" placeholder="请输入企业地址"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">经营范围</span>
        <p class="comwidth340px">
          <el-input v-model="operationScope" placeholder="请输入经营范围"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">经营产品</span>
        <p class="comwidth340px">
          <el-input v-model="operationProduct" placeholder="请输入经营产品"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">邮箱</span>
        <p class="comwidth340px">
          <el-input v-model="email" placeholder="请输入内容"></el-input>
        </p>
      </li>
      <li>
        <span class="data-p-text left">中标记录</span>
        <p class="marginTop16 left">
          <el-radio v-model="isHit" label="0">中过标</el-radio>
          <el-radio v-model="isHit" label="1">未中标</el-radio>
        </p>
      </li>
      <li>
        <span class="data-p-text left">产品检测报告</span>
        <p class="marginTop16 left">
          <el-radio v-model="inspectionReport" label="0">是</el-radio>
          <el-radio v-model="inspectionReport" label="1">否</el-radio>
        </p>
      </li>
      <li>
        <span class="data-p-text left">列入政府采购</span>
        <p class="marginTop16 left">
          <el-radio v-model="joinGovernment" label="0">是</el-radio>
          <el-radio v-model="joinGovernment" label="1">否</el-radio>
        </p>
      </li>
    </div>
    <div class="aptitude">
      <!--v-text="item"-->
      <p class="aptitude-tips">您企业的资质条件，直接推送符合您企业的招标信息</p>
      <div class="aptitude-div">
        <p class="aptitude-tips-title">企业资质</p>
        <li v-for="(item,index) in inputNum">
          <!--<el-input v-model="item.value" placeholder="请添加您的企业资质"></el-input>-->
          <el-autocomplete
            class="inline-input"
            v-model="item.value"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button size="medium" @click="inputNumDel(index)" type="info" plain>删除</el-button>
        </li>
        <el-button @click="inputNumAdd(0)">+添加资质</el-button>
      </div>
      <div class="aptitude-div">
        <p class="aptitude-tips-title">专利证书</p>
        <li v-for="(item,index) in inputNum1">
          <!--<el-input v-model="item.value" placeholder="请添加您的企业资质"></el-input>-->
          <el-autocomplete
            class="inline-input"
            v-model="item.value"
            :fetch-suggestions="querySearch"
            placeholder="添加企业专利证书"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button size="medium" @click="inputNumDel1(index)" type="info" plain>删除</el-button>
        </li>
        <el-button @click="inputNumAdd(1)">+添加专利证书</el-button>
      </div>
      <div class="aptitude-div">
        <p class="aptitude-tips-title">知识产权</p>
        <li v-for="(item,index) in inputNum2">
          <!--<el-input v-model="item.value" placeholder="请添加您的企业资质"></el-input>-->
          <el-autocomplete
            class="inline-input"
            v-model="item.value"
            :fetch-suggestions="querySearch"
            placeholder="添加企业知识产权"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button size="medium" @click="inputNumDel2(index)" type="info" plain>删除</el-button>
        </li>
        <el-button @click="inputNumAdd(2)">+添加知识产权</el-button>
      </div>
      <div class="aptitude-div">
        <p class="aptitude-tips-title">售后证明</p>
        <li v-for="(item,index) in inputNum3">
          <!--<el-input v-model="item.value" placeholder="请添加您的企业资质"></el-input>-->
          <el-autocomplete
            class="inline-input"
            v-model="item.value"
            :fetch-suggestions="querySearch"
            placeholder="添加企业售后证明"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button size="medium" @click="inputNumDel3(index)" type="info" plain>删除</el-button>
        </li>
        <el-button @click="inputNumAdd(3)">+添加售后证明</el-button>
      </div>
      <div class="aptitude-div">
        <p class="aptitude-tips-title">团队资历</p>
        <li v-for="(item,index) in inputNum4">
          <!--<el-input v-model="item.value" placeholder="请添加您的企业资质"></el-input>-->
          <el-autocomplete
            class="inline-input"
            v-model="item.value"
            :fetch-suggestions="querySearch"
            placeholder="添加团队资历"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button size="medium" @click="inputNumDel4(index)" type="info" plain>删除</el-button>
        </li>
        <el-button @click="inputNumAdd(4)">+添加团队资历</el-button>
      </div>
      <div class="aptitude-div">
        <p class="aptitude-tips-title">近年案例</p>
        <li v-for="(item,index) in inputNum5">
          <!--<el-input v-model="item.value" placeholder="请添加您的企业资质"></el-input>-->
          <el-autocomplete
            class="inline-input"
            v-model="item.value"
            :fetch-suggestions="querySearch"
            placeholder="添加近年案例"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button size="medium" @click="inputNumDel5(index)" type="info" plain>删除</el-button>
        </li>
        <el-button @click="inputNumAdd(5)">+添加近年案例</el-button>
      </div>
    </div>
    <div class="pic-company">
      <p class="aptitude-tips">上传营业执照</p>
      <div class="pic-List">
        <el-upload
          :file-list="arrayListPic"
          :auto-upload="false"
          :limit="1"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-exceed="onExceed"
          :on-change="handleCardPreview"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="营业执照">
        </el-dialog>
      </div>
    </div>
    <div class="update-company">
      <el-button type="primary" @click="submitClick">提交</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'update_Certification',
    data () {
      return {
        loading:false,
        arrayListPic:[],
        organizationCode:'',
        inputNum:[],/*企业资质*/
        inputNum1:[],/*企业资质*/
        inputNum2:[],/*企业资质*/
        inputNum3:[],/*企业资质*/
        inputNum4:[],/*企业资质*/
        inputNum5:[],/*企业资质*/
        checkList:[],
        valueNum:0,

        optionsArea:[],
        selectedOptions3:'',

        companyScale:'',
        inspectionReport:'',
        joinGovernment:'',
        email:'',
        registerCapital:'',
        prov:[],
        city:[],
        startDate:'',
        isHit:'1',
        value: '',
        valueText:'',
        centerDialogVisible: false,
        selectIndustryList:'',
        dialogImageUrl: '',
        dialogVisible: false,
        imgBase64:'',
        industryTop:[],
        industryTopId:[],
        proList:[],
        cityList:[],
        arrayTest:[],
        companyScaleList:[],
        organizationCode:'',//组织代码
        operatingState:'',//经营状态
        taxCode:'',//纳税人识别号
        registerCode:'',//注册号
        enterpriseForms:'',//公司类型
        timeList:'',//营业期限
        timeStart:'',//营业期限开始
        timeStop:'',//营业期限结束
        registerUnit:'',//登记机关
        timeApproval:'',//核准日期
        nameEnglish:'',//英文名
        nameUsed:'',//曾用名
        address:'',//企业地址
        operationScope:'',//经营范围
        operationProduct:'',//经营产品
        creditCode:'',//统一社会信用代码
        fatherIndustryTop:'',
        props: {
          label: 'name',
          children: 'child',
          value:'id',
        },
        elCascader:[],
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB',
        'getPersonalDB'
      ]),
    },
    mounted () {
      this.selectIndustry();
      if(this.getPersonalDB.score == ''){
        this.valueNum = 0;
        this.valueText = '0';
      }else{
        this.valueNum =  this.accMul(this.accDiv(this.getPersonalDB.score,100),5);
        this.valueText = JSON.stringify(Math.ceil(this.accMul(this.valueNum,20)));
      }
      this.chooseSelect();
      this.initDB();
    },
    methods: {
      ...mapActions([
        'update_Search',
        'updatePersonalDB'
      ]),
      inputNumDel:function(index){
        this.inputNum.splice(index,1);
      },
      inputNumDel1:function(index){
        this.inputNum1.splice(index,1);
      },
      inputNumDel2:function(index){
        this.inputNum2.splice(index,1);
      },
      inputNumDel3:function(index){
        this.inputNum3.splice(index,1);
      },
      inputNumDel4:function(index){
        this.inputNum4.splice(index,1);
      },
      inputNumDel5:function(index){
        this.inputNum5.splice(index,1);
      },
      querySearch(queryString, cb) {
        var self = this;
        var restaurants,results;
        axios.post(this.getAPIState+'selectQualification',JSON.stringify({ name:queryString }))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              restaurants = obj.qualification;
              results = queryString ? restaurants.filter(self.createFilter(queryString)) : restaurants;
              cb(results);
            }
          }).catch(function (error) {
        });
      },
      createFilter(queryString) {
        return (restaurant) => {
          return true;
        };
      },
      handleSelect:function(item) {
      },
      chooseSelect:function(){
        var self = this;
        axios.post(self.getAPIState+'selectCompanyScale')
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
                self.companyScaleList = obj.companyScaleList;
            }
          }).catch(function (error) {
        });
      },
      /*init初始化*/
      initDB:function(){
          var self = this;
          var obj = this.getPersonalDB;
          this.email = obj.email;
          this.industryTop = [];
          this.fatherIndustryTop = obj.industryTopId;
          this.handleItemChange1(obj.areaPid);

          if(obj.industryId == ''){
            this.checkList = [];
          }else{
            this.checkList = obj.industryId;
          }

          this.organizationCode = obj.organizationCode;
          this.registerCapital = obj.registerCapital;
          this.startDate = obj.startDate;
          this.isHit = obj.isHit;
          this.inspectionReport = obj.inspectionReport;
          this.companyScale = obj.companyScaleValue;
          this.joinGovernment = obj.joinGovernment;

          this.organizationCode = obj.organizationCode;
          this.operatingState = obj.operatingState;
          this.taxCode = obj.taxCode;
          this.registerCode = obj.registerCode;
          this.enterpriseForms = obj.enterpriseForms;
          this.timeStart = obj.timeStart;
          this.timeStop = obj.timeStop;
          this.timeList = [
            self.moment(obj.timeStart).utc()._d,
            self.moment(obj.timeStop).utc()._d
          ];
          this.creditCode = obj.creditCode;
          this.registerUnit = obj.registerUnit;
          this.timeApproval = obj.timeApproval;
          this.nameEnglish = obj.nameEnglish;
          this.nameUsed = obj.nameUsed;
          this.address = obj.address;
          this.operationScope = obj.operationScope;
          this.operationProduct = obj.operationProduct;
          if(obj.imgLicense == ''){
            this.arrayListPic = [];
          }else{
            this.arrayListPic.push({name:'企业执照',url:obj.imgLicense});
            this.imgBase64 = obj.imgLicense;
          }
          for(var i=0;i<obj.qualification.length;i++){
            if(!obj.qualification.length == 0){
              self.inputNum.push({value:obj.qualification[i]})
            }
          }
          for(var i=0;i<obj.patent.length;i++){
            if(!obj.patent.length == 0){
              self.inputNum1.push({value:obj.patent[i]})
            }
          }
          for(var i=0;i<obj.intellectualProperty.length;i++){
            if(!obj.intellectualProperty.length == 0){
              self.inputNum2.push({value:obj.intellectualProperty[i]})
            }
          }
          for(var i=0;i<obj.afterProof.length;i++){
            if(!obj.afterProof.length == 0){
              self.inputNum3.push({value:obj.afterProof[i]})
            }
          }
          for(var i=0;i<obj.groupQualifications.length;i++){
            if(!obj.groupQualifications.length == 0){
              self.inputNum4.push({value:obj.groupQualifications[i]})
            }
          }
          for(var i=0;i<obj.recentCase.length;i++){
            if(!obj.recentCase.length == 0){
              self.inputNum5.push({value:obj.recentCase[i]})
            }
          }
  },
      handleChange:function(value) {
        this.elCascader = value;
      },
      handleItemChange:function(val){
        var self = this;
        /*初始化行业查询*/
        var arrayPro = [];
        for(var i=0;i<self.proList.length;i++){
          arrayPro.push(self.proList[i].id);
        }
        axios.post(this.getAPIState+'selectAddress',JSON.stringify({id:JSON.stringify(val[0])}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              var index = arrayPro.indexOf(val[0]);
              self.proList[index].child = obj.areaList[0].child;
            }
          }).catch(function (error) {
        });
      },
      handleItemChange1:function(val1){
        var self = this;
        var arrayPro = [];

        var data = {
          id:JSON.stringify(''),
        }
        axios.post(this.getAPIState+'selectAddress',JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.proList = obj.areaList[0].child;
              for(var i=0;i<self.proList.length;i++){
                arrayPro.push(self.proList[i].id);
              }
              axios.post(self.getAPIState+'selectAddress',JSON.stringify({id:JSON.stringify(val1)}))
                .then(function (obj) {
                  var obj = obj.data.data;
                  if(obj.result == '0'){
                    var index = arrayPro.indexOf(val1);
                    self.proList[index].child = obj.areaList[0].child;
                    console.log(self.proList[0]);
                    self.elCascader = [
                      self.getPersonalDB.areaPid,
                      self.getPersonalDB.areaSid,
                      self.getPersonalDB.areaCid,
                    ]
                    console.log(self.elCascader);
                  }
                }).catch(function (error) {
              });
            }
          }).catch(function (error) {
        });
      },
      /*提交*/
      submitClick:function(){
        var self = this;
        var emailTest = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!emailTest.test(self.email)){
          self.$message({
            showClose: true,
            message: "邮箱格式不正确",
            type: 'warning'
          });
          return false;
        }

        self.loading = true;
        var arrayCheckList = self.checkList;/**/
        var arrayArrayTest = self.arrayTest/**/
        for(var i=0;i<arrayCheckList.length;i++){
          for(var t=0;t<arrayArrayTest.length;t++){
            if(arrayCheckList[i] == arrayArrayTest[t].id){
              self.industryTop.push(arrayArrayTest[t].pId);
            }
          }
        }

        var arr = self.industryTop, i, obj = {}, result = [],arrayString;
        for(i = 0; i< arr.length; i++){
          if(!obj[self.industryTop[i]]){  //如果能查找到，证明数组元素重复了
            obj[self.industryTop[i]] = 1;
            result.push(self.industryTop[i]);
          }
        }

        var v1,v2;
        if(self.checkList.length == 0){
            v1 = self.arrayString(self.fatherIndustryTop);
            v2 = self.arrayString(self.checkList);
        }else{
            v1 = self.arrayString(result);
            v2 = self.arrayString(self.checkList);
        }

        var data = {
          id:this.getUserDB.userId,
          name:this.getPersonalDB.name,
          email:self.email,
          industryTop:v1,
          industrySub:v2,
          prov:JSON.stringify(self.elCascader[0]),
          city:JSON.stringify(self.elCascader[1]),
          county:JSON.stringify(self.elCascader[2]),
          imgLicense:self.imgBase64,
          organizationCode:self.organizationCode,
          registerCapital:self.registerCapital,
          startDate:self.fmtDate(self.startDate),
          companyScale:self.companyScale,
          isHit:self.isHit,
          inspectionReport:self.inspectionReport,
          joinGovernment:self.joinGovernment,
          qualification:self.arrayObject(self.inputNum),
          patent:self.arrayObject(self.inputNum1),
          intellectualProperty:self.arrayObject(self.inputNum2),
          afterProof:self.arrayObject(self.inputNum3),
          groupQualifications:self.arrayObject(self.inputNum4),
          recentCase:self.arrayObject(self.inputNum5),
          organizationCode:self.organizationCode,
          operatingState:self.operatingState,
          taxCode:self.taxCode,
          creditCode:self.creditCode,
          registerCode:self.registerCode,
          enterpriseForms:self.enterpriseForms,
          timeStart:self.moment(self.timeList[0]).format('YYYY-MM-DD'),
          timeStop:self.moment(self.timeList[1]).format('YYYY-MM-DD'),
          registerUnit:self.registerUnit,
          timeApproval:self.timeApproval,
          nameEnglish:self.nameEnglish,
          nameUsed:self.nameUsed,
          address:self.address,
          operationScope:self.operationScope,
          operationProduct:self.operationProduct,
        }
        /*初始化行业查询*/
        axios.post(self.getAPIState+'companyCertificate',JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.updatePersonalDB({userId:self.getUserDB.userId});
              self.$message({
                showClose: true,
                message: "企业数据修改成功",
                type: 'success'
              });
              self.loading = false;
            }
          }).catch(function (error) {
        });
      },
      /*获取图片*/
      handleCardPreview:function(file, fileList){
        var self = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          self.imgBase64 = this.result;
        }
      },
      /*选择行业*/
      selectIndustry:function(){
        var self = this;
        /*初始化行业查询*/
        axios.post(this.getAPIState+'selectIndustry')
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.selectIndustryList = obj.industryList
              var kiss = obj.industryList;
              var second;
              for(var i=0;i<kiss.length;i++){
                second = kiss[i].cIndustryList;
                for(var t=0;t<second.length;t++){
                  self.arrayTest.push(second[t]);
                }
              }
            }
          }).catch(function (error) {
        });
      },
      /*文件超过数量钩子函数*/
      onExceed:function(){
        this.$message({
          message: '营业执照只需要上传正面一张即可',
          type: 'warning'
        });
      },
      inputNumAdd:function(num){
        switch(num)
        {
          case 0:
            this.inputNum.push({value:''});
            break;
          case 1:
            this.inputNum1.push({value:''});
            break;
          case 2:
            this.inputNum2.push({value:''});
            break;
          case 3:
            this.inputNum3.push({value:''});
            break;
          case 4:
            this.inputNum4.push({value:''});
            break;
          case 5:
            this.inputNum5.push({value:''});
            break;
          default:
        }
      },
      handleRemove(file, fileList) {
        this.arrayListPic = [];
        this.imgBase64 = '';
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      /*地址选择*/
      selectAdress:function(id){
        var self = this;
        var data = {
          id:JSON.stringify(id),
        }
        axios.post(this.getAPIState+'selectAddress',JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
                self.proList = obj.areaList[0].child;
            }
          }).catch(function (error) {
        });
      },
      testCheckGroup:function(){
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .Certification {
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
  .data-perfection {
    border-bottom: 1px solid #ddd
  }
  .data-perfection li {
    margin-bottom: 10px;
    overflow: hidden;
  }
  .data-p-text {
    line-height: 50px;
    display: inline-block;
    font-size: 16px;
    margin-right: 20px;
    color: #999;
    width: 140px;
  }
  .data-p-tip {
    line-height: 50px;
    font-size: 14px;
    color: #999;
    margin-left: 10px;
    display: inline-block;
  }
  .com-text-data {
    line-height: 50px;
    font-size: 14px;
    color: #333;
  }
  .aptitude {
    box-sizing: border-box;
  }
  .aptitude-tips {
    padding-top: 40px;
    padding-bottom: 36px;
    font-size: 16px;
    color: #333;
  }
  .aptitude li {
    margin-bottom: 10px;
    color: #00bffe;
    font-size: 14px;
    width: 550px;
  }
  .aptitude-value {
    color: #333;
  }
  .pic-company {
    margin-top: 38px;
    border-top: 1px solid #ddd
  }
  .pic-List {
    overflow: hidden;
  }
  .pic-List li {
    background: #00bffe;
    float: left;
    margin-right: 30px;
    margin-bottom: 20px;
    height: 267px;
    width: 200px;
  }
  .update-company {
    text-align: center;
  }
  .el-button--primary:focus, .el-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .el-button--primary {
    background: #00bffe;
    border-color: #00bffe;
    width: 340px;
    height: 50px;
  }
  .comwidth340px .el-input {
    width: 340px;
    height: 50px;
  }
  .marginTop15 {
    margin-top: 15px;
  }
  .marginTop16 {
    margin-top: 17px;
  }
  .chooseTitle {
    margin-top: 18px;
    margin-bottom: 9px;
    font-size: 16px;
    color: #333;
  }
  .chooseLi {
    width: 230px;
  }
  .chooseText {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 200px;
  }
  .aptitude .el-autocomplete {
    width: 460px;
  }
  .aptitude-tips-title {
    padding: 20px 0;
    font-size: 16px;
    color: #333;
  }
  .aptitude-div {
    border-top: 1px dashed #ddd;
    padding-bottom: 20px;
  }
</style>

