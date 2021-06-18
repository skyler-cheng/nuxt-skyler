/**
 * 應用配置 如請求格式，反回格式，異常處理方式，分頁格式等
 */
export default {
  apiBaseURL:'https://backend.skyler.tw/nuxt-api',
  apiToken:'p2lbgWkFrykA4QyUmpHihzmc5BNzIABq',
  /**
   * 模擬數據時包裝反回數據
   * 因為，後端反回數據時一般都會在外邊包裝一層狀態信息
   * 如成功時：
   * {
   *   status: true,
   *   data: responseData
   * }
   * 或出錯時：
   * {
   *   status: false,
   *   code: 500,
   *   message: '用戶名或密碼錯誤'
   * }
   * 這裡就是配置這兩個函數，為了我們模擬數據時可以少寫幾行代碼的 orz...
   */
  mock: {
    toSuccess: (response, code) => ([code, {
      status: code,
      data: response
    }]),
    toError: (message, code) => ([code, {
      status: code,
      msg: message
    }])
  }
};
