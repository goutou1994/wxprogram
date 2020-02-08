export interface Store {
  data: {
    db: DB.Database | null,
    [propName: string]: any
  },
  debug: Boolean
}

const e: Store = {
  data: {
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logs: [],
    db: null
  },
  //无脑全部更新，组件或页面不需要声明 use
  //updateAll: true,
  debug: true
};

export default e;