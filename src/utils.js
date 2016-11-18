/**
 * @license Created by felix on 16-11-16.
 * @email   307253927@qq.com
 */
'use strict';
export default class Utils {
  static uuid() {
    let i, random, uuid = '';
    for (i = 0; i < 16; i++) {
      random = Math.random() * 16 | 0;
      if (i === 4 || i === 8 || i === 12 || i === 16) {
        uuid += '-';
      }
      uuid += random.toString(16);
    }
    return uuid;
  }
  
  static pluralize(count, word) {
    return count === 1 ? word : word + 's';
  }
  
  static store(namespace, data) {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }
    let store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  }
  
  static extend() {
    let newObj = {};
    for (let i = 0, len = arguments.length; i < len; i++) {
      let obj = arguments[i];
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }
};

Utils.ENTER_KEY       = 13;
Utils.ESCAPE_KEY      = 27;
Utils.ALL_TODOS       = 'all';
Utils.ACTIVE_TODOS    = 'active';
Utils.COMPLETED_TODOS = 'completed';
