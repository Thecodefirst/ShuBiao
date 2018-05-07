//仅单向的获取数据，不做任何修改
export const getters = {
  getAPIState: state => {
    return state.api;
  },
  getBannerCP: state => {
    return state.bannerCP;
  },
  getSearch: state => {
    return state.isSearch;
  },
  getIsLogin: state => {
    return state.isLogin;
  },
  getUserDB: state => {
    return state.userDB;
  },
  /*getNoticeInfo:state => {
    if(state.noticeInfoID == ''){
      console.log(JSON.parse(sessionStorage.getItem('noticeInfoID')));
      return JSON.parse(sessionStorage.getItem('noticeInfoID'));
    }else{
      return state.noticeInfoID;
    }
  },*/
  getMatchList:state => {
    if(state.matchList == ''){
      return JSON.parse(sessionStorage.getItem('policyOption')).policyInfo[0];
    }else{
      return state.matchList.policyInfo[0];
    }
  },
  getPolicyList:state => {
    if(state.matchList == ''){
      return JSON.parse(sessionStorage.getItem('policyOption')).policyList;
    }else{
      return state.matchList.policyList;
    }
  },
  getPersonalDB:state => {
    if(state.personalCenterDB == ''){
      return JSON.parse(sessionStorage.getItem('companyInfo')).userCompanyInfo[0];
    }else{
      return state.personalCenterDB.userCompanyInfo[0];
    }
  },
  getNavList:state => {
    return [state.navList,state.navList1];
  },
  getNavListTitle:state => {
    return state.navListTitle;
  },
  getNavIndex:state => {
    return state.navIndex;
  },
  getLookReport:state => {
    if(state.lookReport == ''){
      return JSON.parse(sessionStorage.getItem('analysisNotice'));
    }else{
      return state.lookReport;
    }
  },
  getNavListIndex:state => {
    if(state.navListIndex == ''){
      return JSON.parse(sessionStorage.getItem('navListIndex'));
    }else{
      return state.navListIndex;
    }
  },
  getShowDrawOFF:state => {
    /*if(state.showDrawOFF == ''){
      return JSON.parse(sessionStorage.getItem('showDrawOFF'));
    }else{
      return state.showDrawOFF;
    }*/
    return state.showDrawOFF;
  },
  getSeachObject:state => {
    return state.searchObject;
  },
  getpolicyObject:state => {
    return state.policyObject;
  },
  getpolicyObjectAdd:state => {
    if(state.policyObject.policyType == ''){
      return 'adus';
    }else{
      return state.policyObject.policyType;
    }
  },
  getCompanyOption:state => {
    if(state.companyOptionsDB == ''){
      return JSON.parse(sessionStorage.getItem('companyDynamics'));
    }else{
      return state.companyOptionsDB;
    }
  },
  getCompanyOptionDB:state => {
    if(state.companyOptions == ''){
      return JSON.parse(sessionStorage.getItem('updateCompanyOptions'));
    }else{
      return state.companyOptions;
    }
  },
  getNoticeDB:state => {
    if(state.noticeDB == ''){
      return JSON.parse(sessionStorage.getItem('noticeDB'));
    }else{
      return state.noticeDB;
    }
  },
  getIndexData:state => {
    return state.indexData;
  },
  getIndexTableList:state => {
    return state.indexTableList;
  },
  getIndexTableListPI:state => {
    return state.indexTableListPI;
  },
  getFullscreenLoading:state => {
    return state.fullscreenLoading;
  },
  getNoticeTitle:state => {
    return state.notieTitle;
  },
  getFirmList:state => {
    return state.firmList;
  },
  getNoticeIntroduction:state => {
    return state.noticeIntroduction;
  },
};



