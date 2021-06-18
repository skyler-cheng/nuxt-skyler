import EventEmitter from 'wolfy87-eventemitter';
import { isFunction, isArray } from './util';

export const eventEmitter = new EventEmitter();

export default eventEmitter;

/**
 * 註冊事件監聽
 * @param {string} eventName 事件名稱
 * @param {array|function} callbacks 事件觸發時調用的函數，
 * 支持數組傳入多個函數。一般上willmount時進行註冊，
 * 在didMount時調用off進行解除註冊。
 */
export const on = (eventName, callbacks) => {
  if (isFunction(callbacks)) {
    eventEmitter.addListener(eventName, callbacks);
  } else if (isArray(callbacks)) {
    eventEmitter.addListeners(eventName, callbacks);
  } else {
    console.error('類型錯誤： ', callbacks);
  }
};

/**
 * 註冊一次事件監聽，只能觸發一次trigger觸發後即自動從監聽中移除
 * @param {string} eventName 事件名稱
 * @param {function} callback 事件觸發時調用的函數
 */
export const once = (eventName, callback) => {
  if (isFunction(callback)) {
    eventEmitter.addOnceListener(eventName, callback);
  } else {
    console.error('類型錯誤： ', callback);
  }
};

/**
 * 移除事件監聽
 * @param {string} eventName 事件名稱
 * @param {array|function} callbacks 事件名稱對應的函數
 */
export const off = (eventName, callbacks) => {
  if (isFunction(callbacks)) {
    eventEmitter.removeListener(eventName, callbacks);
  } else if (isArray(callbacks)) {
    eventEmitter.removeListeners(eventName, callbacks);
  } else {
    console.error('類型錯誤： ', callbacks);
  }
};

/**
 * 觸發事件
 * @param {string} eventName 事件名稱
 * @param {obj} args 需要傳遞的參數
 */
export const trigger = (eventName, ...args) => {
  eventEmitter.emitEvent(eventName, args);
};
