//拥有对数据操作的权利，可以进行修改
export const mutations = {
  //api
  API_STATE(state,data){
    state.api = data;
  },
  API_ISSEARCH(state,data){
    state.isSearch = data;
  },
  API_ISLOGIN(state,data){
    state.isLogin = data;
  },
  API_USERDB(state,data){
    state.userDB = data;
  },

  API_MATCHLIST(state,data){
    state.matchList = data;
  },
  API_PERSONALDB(state,data){
    state.personalCenterDB = data;
  },
  API_NAVINDEX(state,data){
    state.navIndex = data;
  },
  API_BANNER(state,data){
    state.bannerCP = data;
  },
  API_LOOKREPORT(state,data){
    state.lookReport = data;
  },
  API_NAVLISTINDEX(state,data){
    state.navListIndex = data;
  },
  API_showDrawOFF(state,data){
    state.showDrawOFF = data;
  },
  API_SEARCHOBJ(state,data){
    if(!(typeof(data.total) == "undefined")){
      state.searchObject.total = data.total;
    }
    if(!(typeof(data.search) == "undefined")){
      state.searchObject.search = data.search;
    }
    if(!(typeof(data.time) == "undefined")){
      state.searchObject.time = data.time;
    }
    if(!(typeof(data.address) == "undefined")){
      state.searchObject.address = data.address;
    }
    if(!(typeof(data.city) == "undefined")){
      state.searchObject.city = data.city;
    }
    if(!(typeof(data.county) == "undefined")){
      state.searchObject.county = data.county;
    }
    if(!(typeof(data.infoType) == "undefined")){
      state.searchObject.infoType = data.infoType;
    }
    if(!(typeof(data.infoTypeMin) == "undefined")){
      state.searchObject.infoTypeMin = data.infoTypeMin;
    }
    if(!(typeof(data.industry) == "undefined")){
      state.searchObject.industry = data.industry;
    }
    if(!(typeof(data.industryMin) == "undefined")){
      state.searchObject.industryMin = data.industryMin;
    }
    state.searchObject.userId = state.userDB.userId;
  },
  API_POLICYOBJECT(state,data){
    if(!(typeof(data.total) == "undefined")){
      state.policyObject.total = data.total;
    }
    if(!(typeof(data.search) == "undefined")){
      state.policyObject.search = data.search;
    }
    if(!(typeof(data.time) == "undefined")){
      state.policyObject.time = data.time;
    }
    if(!(typeof(data.policyType) == "undefined")){
      state.policyObject.policyType = data.policyType;
    }
    if(!(typeof(data.infoType) == "undefined")){
      state.policyObject.infoType = data.infoType;
    }
    if(!(typeof(data.infoTypeMin) == "undefined")){
      state.policyObject.infoTypeMin = data.infoTypeMin;
    }
    if(!(typeof(data.industry) == "undefined")){
      state.policyObject.industry = data.industry;
    }
    state.policyObject.userId = state.userDB.userId;
  },
  API_COMPANYOPTIONSDB(state,data){
    state.companyOptionsDB = data;
  },
  API_COMPANYOPTIONS(state,data){
    state.companyOptions = data;
  },
  API_APIUPDATE(state,data){
    state.api = data;
  },
  API_NoticeInfoDB(state,data){
    state.NoticeInfoDB = data;
  },
  API_NoticeDB(state,data){
    state.noticeDB = data;
  },

  API_INDEXDATA(state,data){
    state.indexData = data;
  },
  API_INDEXTABLELIST(state,data){
    state.indexTableList = data;
  },
  API_INDEXTABLELISTPI(state,data){
    state.indexTableListPI = data;
  },
  API_fullscreenLoading(state,data){
    state.fullscreenLoading = data;
  },
  API_NOTICETITLE(state,data){
    state.notieTitle = data;
  },
  API_firmList(state,data){
    state.firmList = data;
  },
  API_noticeIntroduction(state,data){
    state.noticeIntroduction = data;
  },
}
