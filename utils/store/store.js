import store from 'store2';
import { isObject, isFunction } from '../util';

export default class Store {
  constructor(namespace) {
    this.store = namespace ? store.namespace(namespace) : store;
    this.session = this.store.session;
    this.local = this.store.local;
  }

  /**
   * 反回一個新的store
   */
  create = (namespace) => new Store(namespace)

  /**
   * 將 value 存儲在本地緩存中指定的 key 中，會覆蓋掉原來該 key 對應的內容
   * Examples:
   *
   *   .setStore('name', 'abc')
   *   .setStore({ name: 'abc', age: 18 }) // 一次儲存多個
   * @param {string | object} key 
   * @param {any} value 
   */
  setStore = (key, value) => {
    if (isObject(key)) {
      this.store.setAll(key);
    } else {
      this.store.set(key, value);
    }
    return this;
  }

  /**
   * 從本地緩存中異步獲取指定 key 對應的內容, 如指定alt當沒找到時反回alt
   * @param {string} key 
   * @return {Promise}
   */
  getStoreAsync = (key, alt) => Promise.resolve(this.store.get(key, alt))
  /**
   * 從本地緩存中同步獲取指定 key 對應的內容, 如指定alt當沒找到時反回alt
   * @param {string} key 
   * @param {any} alt
   */
  getStore = (key, alt) => this.store.get(key, alt)

  /**
   * 獲取當前Store的所有key-value信息,放入一個對像中
   */
  getStoreInfo = () => this.store.getAll()

  /**
   * 獲取當前Store的所有key-value信息,放入一個回調函數里,這樣可以接著鍊式操作
   * .getStoreInfoAsync(v => v).setStore({})
   */
  getStoreInfoAsync = (cb) => {
    if (isFunction(cb)) cb(this.store.getAll());
    return this;
  }

  /**
   * 從本地緩存中移除指定 key
   * @param {string} key 
   */
  removeStore = (key) => {
    this.store.remove(key);
    return this;
  }

  /**
   * 清理本地數據緩存
   */
  clearStore = () => {
    this.store.clearAll();
    return this;
  }

  /**
   * 直接使用 store2
   */
  native = () => {
    return store;
  }
}