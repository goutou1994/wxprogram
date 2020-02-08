/// <reference path="./types/index.d.ts" />
/// <reference path="../miniprogram/subs/Minerva/types.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}