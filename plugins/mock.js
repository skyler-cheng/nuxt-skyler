import mocks from '../mocks/'
import $$ from '~/utils/index'
import Mock from 'mockjs'

const MockAdapter = require('axios-mock-adapter')
const config = require('../base.config.js')
const mock = Mock.mock

/** * 模擬延遲請求 
 * @param {any} response 模擬響應數據 
 * @param {number} time 延時多少毫秒，省略這個將會生成100ms內的一個延時 
 */
const delay = (response, time) => {
  return $$.delay(time || Math.random() * 100).then(() => response);
};

// 模擬數據時包裝反回數據
// MockAdapter 返回格式要求[200, {}]
const toSuccess = (response, time, code = 200) => {
    if (time) {
        return delay(config.mock.toSuccess(response, code), time);
    } else {
        return config.mock.toSuccess(response, code);
    }
};
const toError = (message, time, code = 200) => {
    if (time) {
        return delay(config.mock.toError(message, code), time)
    } else {
        return config.mock.toError(message, code)
    }
};

// 批量註冊路由事件，以插件形式對外拋出
// MockAdapter基本使用可參考官方說明
export default function ({ $timelinkerApi }) {
    if(!config.useMock){
        return;
    }
    
    const axiosMock = new MockAdapter($timelinkerApi);

    Object.values(mocks).forEach(mockFile => {
        let mockAPIs = {}
        if ($$.isFunction(mockFile)) {
            mockAPIs = mockFile({ axiosMock, delay, mock, toSuccess, toError });
        } else if ($$.isObject(mockFile)) {
            mockAPIs = mockFile;
        } else {
            throw new Error('mock file require both Function or Object');
        }

        for (const key in mockAPIs) {
            const method_url = key.split(' ');  // 'api/login get'
            const apiItem = mockAPIs[method_url[0]]
            const method = 'on' + (method_url[1] != 'get' ? 'Post' : 'Get')

            if ($$.isFunction(apiItem)) {
                // or reply(apiItem)
                axiosMock[method](method_url[0]).reply(config => {
                const query = config.data ? JSON.parse(config.data) : {}
                return apiItem(config, query)
                })
            } else {
                axiosMock[method](method_url[0]).reply(200, apiItem)
            }
        }
    })
}
