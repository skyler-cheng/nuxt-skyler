/**
 * 模擬請求數據
 * @param {FetchMock} fetchMock 當現有條件不滿足時，可以使用fetchMock來進行擴展
 * @param {function} delay 增加延遲時間 ms 例: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock 使用mock生成數據，例:

   mock({
     'string|1-10': '★' // 生成最少1顆，最多10顆星字符
   })

   // {'string': '★★★★★★'} 

  更多用法參考 http://mockjs.com/examples.html
 */
export default ({axiosMock, delay, mock, toSuccess, toError}) => {
  // 如果現有擴展不滿足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/timelinker-api/user/login': (options, user) => {
      if (user.account === 'admin' && user.password === 'admin') {
        return toSuccess(mock({
              'token': '@guid',
              'name': '@cname'
            }), 200);
      } else {
        return toError(mock(
          {
            'status': 'passwordMismatch',
            'dataResult': null,
            'message': '登入失敗，密碼比對不符'
          }
        ), 200);
      }
    }
  }
}