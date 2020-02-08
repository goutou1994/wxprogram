import { Store } from '../store';

export function formatTime(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export function getDB(app: {globalData: {db?: DB.Database}}) : DB.Database {
  if (!app.globalData.db) {
    wx.cloud.init({
      env: 'goutou1994-4e4iq'
    });
    app.globalData.db = wx.cloud.database();
  }
  return app.globalData.db;
}

export function find<T>(arr: Array<T>, pre: (arg0: T) => Boolean): T | undefined {
  for (let i = 0; i < arr.length; i++) {
    if (pre(arr[i])) {
      return arr[i];
    }
  }
  return undefined;
}