//相当于API接口，调用mutation方法对数据进行操作
import axios from 'axios'
import actionRouter from '../router'
export const actions = {
 /* updateUser({ dispatch,state,commit,getters },data){
    commit('USER_STATE',data[0]);
    commit('AJAXTABLE',data[1]);
    if(data[1] == "3"){
      var List = {
        "personId":data[0].userId,
      };
      axios.post(getters.getUrl+"personInfo", JSON.stringify(List))
        .then(function (response) {
          var obj = response.data.data;
          if(obj.result == "0"){
            return dispatch('updatePersonList',obj.personInfo).then(() => {
              actionRouter.push({path:'/index/selectPersonal'});
            })
          }
        }).catch(function (error) {
      });
    }else{
      actionRouter.push({path:'/index/message/inforStat'});
    }
  },*/
  update_Search({ dispatch,state,commit,getters },data){
     commit('API_ISSEARCH',data);
   },
  update_IsLogin({ dispatch,state,commit,getters },data){
    commit('API_ISLOGIN',data);
  },
  update_UserDB({ dispatch,state,commit,getters },data){
     commit('API_USERDB',data);
  },
  updateNoticeInfo({ dispatch,state,commit,getters },data){
    actionRouter.push({name:'noticeInfo',query:data});
  },
  updateNoticeDB({ dispatch,state,commit,getters },data){
    commit('API_NoticeDB',{
      noticeInfo:[
        {
          id:'',
          name:'',
          status:'',
        }
      ],
      noticeList:[],
    });
    axios.post(state.api+"noticeInfo", JSON.stringify(data))
      .then(function (response) {
        var obj = response.data.data;
        if(obj.result == "0"){

          if(obj.noticeInfo[0].status == '0'){
            obj.collectText = '已收藏';
            obj.collect = true;
          }else{
            obj.collectText = '收藏';
            obj.collect = false;
          }
          sessionStorage.setItem('noticeDB',JSON.stringify(obj))
          commit('API_fullscreenLoading',false);
          commit('API_NoticeDB',obj);
        }
      }).catch(function (error) {
    });
  },
  updateMatchList({ dispatch,state,commit,getters },data){
    commit('API_MATCHLIST','');
    axios.post(state.api+"policyInfo", JSON.stringify(data))
      .then(function (response) {
        var obj = response.data.data;
        if(obj.result == "0"){
          if(obj.policyInfo[0].status == '0'){
            obj.policyInfo[0].collectText = '已收藏';
            obj.policyInfo[0].collect = true;
          }else{
            obj.policyInfo[0].collectText = '收藏';
            obj.policyInfo[0].collect = false;
          }
          commit('API_MATCHLIST',obj);
          sessionStorage.setItem('policyOption',JSON.stringify(obj));
          actionRouter.push({path:'/policyOption'});
        }
      }).catch(function (error) {
    });
  },
  updatePersonalDB({ dispatch,state,commit,getters },data){
    // API_PERSONALDB
    axios.post(state.api+"companyInfo", JSON.stringify(data))
      .then(function (response) {
        var obj = response.data.data;
        if(obj.result == "0"){
          commit('API_PERSONALDB',obj);
          sessionStorage.setItem('companyInfo',JSON.stringify(obj));
          actionRouter.push({path:'/personalCenter/Certification'});
        }
      }).catch(function (error) {
    });
  },
  updateNavIndex({ dispatch,state,commit,getters },data){
    commit('API_NAVINDEX',data);
  },
  updateBanner({ dispatch,state,commit,getters },data){
    commit('API_BANNER',data);
  },
  updateLookReport({ dispatch,state,commit,getters },data){
    axios.post(state.api+"analysisNotice", JSON.stringify(data))
      .then(function (response) {
        var obj = response.data.data;
        if(obj.result == "0"){
          commit('API_LOOKREPORT',obj);
          sessionStorage.setItem('analysisNotice',JSON.stringify(obj));
          actionRouter.push({path:'/analysis'});
        }
      }).catch(function (error) {
    });
  },
  updateNavListIndex({ dispatch,state,commit,getters },data){
    sessionStorage.setItem('navListIndex',data);
    commit('API_NAVLISTINDEX',data);
  },
  updateShowDrawOFF({ dispatch,state,commit,getters },data){
    // sessionStorage.setItem('showDrawOFF',data);
    commit('API_showDrawOFF',data);
  },
  updateSearchObject({ dispatch,state,commit,getters },data){
    commit('API_SEARCHOBJ',data);
  },
  updatePolicyObject({ dispatch,state,commit,getters },data){
    commit('API_POLICYOBJECT',data);
  },
  updateCompanyDynamics({ dispatch,state,commit,getters },data){
    axios.post(state.api+"companyDynamics", JSON.stringify(data))
      .then(function (response) {
        var obj = response.data.data;
        if(obj.result == "0"){
          commit('API_COMPANYOPTIONSDB',obj);
          sessionStorage.setItem('companyDynamics',JSON.stringify(obj));
          actionRouter.push({path:'/companyOptions'});
        }
      }).catch(function (error) {
    });
  },
  updateCompanyOptions({ dispatch,state,commit,getters },data){
    var self = this;
    axios.post(state.api+'firmCard',JSON.stringify(data))
      .then(function (obj) {
        var obj = obj.data.data;
        if(obj.result == '0'){
          sessionStorage.setItem('updateCompanyOptions',JSON.stringify(obj));
          commit('API_COMPANYOPTIONS',obj);
          actionRouter.push({path:'/businessCard'});
        }
      }).catch(function (error) {
    });
  },
  updateURLTABS({ dispatch,state,commit,getters },data){
    commit('API_APIUPDATE',data);
  },
  updateIndexData({ dispatch,state,commit,getters },data){
    axios.post(state.api+'index/newNoticeList', JSON.stringify(data))
      .then(function (obj) {
        var obj = obj.data.data;
        if(obj.result == '0'){
          commit('API_INDEXDATA',obj.noticeList);
        }
      }).catch(function (error) {
    });
  },
  updateIndexTableList({ dispatch,state,commit,getters },data){
    commit('API_INDEXTABLELIST','');
    axios.post(state.api+'index/noticeHallList', JSON.stringify(data))
      .then(function (obj) {
        var obj = obj.data.data;
        if(obj.result == '0'){
          commit('API_INDEXTABLELIST',obj.noticeHallList);
        }
      }).catch(function (error) {
    });
  },
  updateIndexTableListPI({ dispatch,state,commit,getters },data){
    axios.post(state.api+'index/policyList', JSON.stringify(data))
      .then(function (obj) {
        var obj = obj.data.data;
        if(obj.result == '0'){
          commit('API_INDEXTABLELISTPI',obj.policyList);
        }
      }).catch(function (error) {
    });
  },
  updateFullscreenLoading({ dispatch,state,commit,getters },data){
    commit('API_fullscreenLoading',data);
  },
  updateNoticeTitle({ dispatch,state,commit,getters },data){
    commit('API_NOTICETITLE',data);
  },
  updateFirmList({ dispatch,state,commit,getters },data){
    axios.post(state.api+'noticeIntroduction',JSON.stringify(data))
      .then(function (obj) {
        var obj = obj.data.data;
        if(obj.result == '0'){
          commit('API_noticeIntroduction',obj);
        }
      }).catch(function (error) {
    })
  },
  updateNoticeIntroduction({ dispatch,state,commit,getters },data){
    axios.post(state.api+'firmList',JSON.stringify(data))
      .then(function (obj) {
        var obj = obj.data.data;
        if(obj.result == '0'){
          commit('API_firmList',obj.firmList);
        }
      }).catch(function (error) {
    });
  },
}
