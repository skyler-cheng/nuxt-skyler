module.exports = {
  apiBaseURL: 'https://backend.skyler.tw/nuxt-api',
  apiToken: 'p2lbgWkFrykA4QyUmpHihzmc5BNzIABq',
  useMock: false,
  mock: {
    toSuccess: (response, code) => ([code, {
      status: 'success',
      dataResult: response,
      message: '成功'
    }]),
    toError: (response, code) => ([code, {
      status: response.status,
      dataResult: null,
      message: response.message
    }])
  }
};