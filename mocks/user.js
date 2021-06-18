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
          'userName': 'admin',                // 用户名
          'name': '@cname',                   // 中文名称
          'age|1-100': 100,                   // 100以内随机整数
          'birthday': '@date("yyyy-MM-dd")',  // 日期
          'city': '@city(true)',              // 中国城市
          'phone': /^1[385][1-9]\d{8}/,       // 手机号
          'token': '@guid'                    // token
        }), 400);
      } else {
        return toError('用戶名或密碼錯誤 admin/admin');
      }
    },
    '/timelinker-api/user/register': (options, user) => {
      return toSuccess(user)
    },
    '/timelinker-api/user/menu': options => toSuccess([
      {
        name: '仪表盘',
        icon: 'dashboard',
        path: '/dashboard',
      },
      {
        name: '组件',
        icon: 'desktop',
        path: '/component',
        children: [
          {
            name: '工具条',
            path: '/toolbar',
          },
          {
            name: 'BaseComponent',
            path: '/baseComponent',
          },
          {
            name: 'Columns',
            path: '/column',
          },
          {
            name: '搜索条',
            path: '/searchBar',
          },
          {
            name: '数据表格',
            path: '/datatable',
          },
          {
            name: '表单',
            path: '/form',
          },
          {
            name: '穿梭树',
            path: '/transferTree',
          },
          {
            name: '图表',
            path: '/charts',
            children: [
              {
                name: 'ECharts',
                path: '/charts/ec',
              },
              {
                name: 'G2',
                path: '/charts/g2',
              },
            ]
          },
          {
            name: '打印',
            path: '/print',
          },
          {
            name: 'Banner 管理',
            path: '/banner',
          },
        ],
      },
      {
        name: 'UI元素',
        icon: 'share-alt',
        path: '/ui',
        children: [
          {
            name: '按钮',
            path: '/button',
          },
          {
            name: '消息',
            path: '/alerts',
          },
          {
            name: '动画',
            path: '/animations',
          },
          {
            name: '图标',
            path: '/icons',
          },
          {
            name: '富文本',
            path: '/editor',
          },
          {
            name: '模态窗',
            path: '/modal',
          },
          {
            name: '遮罩',
            path: '/mask',
          },
        ],
      },
      {
        name: '页面',
        icon: 'book',
        path: '/page',
        children: [
          {
            name: '登录页',
            path: '/sign/login',
          },
          {
            name: '注册页',
            path: '/sign/register',
          },
          {
            name: '锁屏',
            path: '/lock',
          },
          {
            name: '画廊',
            path: '/gallery',
          },
          {
            name: '空白页',
            path: '/blank',
          },
          {
            name: '结果页',
            path: '/result',
          },
          {
            name: 'Coming Soon',
            path: '/coming',
          },
          {
            name: '403',
            path: '/403',
          },
          {
            name: '404',
            path: '/404',
          },
          {
            name: '500',
            path: '/500',
          },
          {
            name: '多级路由',
            path: '/level-route/:sub?',
          },
        ],
      },
      {
        name: '通用场景',
        icon: 'bulb',
        path: '/business',
        children: [
          {
            name: '课程管理',
            path: '/crud/:detail?',
          }
        ],
      },
    ], 400)
  } 
}