import event, { on, once, off, trigger } from './event'
import store from './store'

const setStore       = store.setStore;
const getStore       = store.getStore
const removeStore    = store.removeStore;
const clearStore     = store.clearStore;

const L = {
  // store api
  store, setStore, getStore, removeStore, clearStore,
  // event api
  event, on, once, off, trigger,
  // common utils
  ...require('./util')
}

export default L