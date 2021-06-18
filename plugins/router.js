
export default ({ app, store, $axios }) => {
  // 頁面請求hook
  app.router.beforeEach((to, from, next) => {
    const isClient = process.client
    if (isClient) {
      const currentUrl = location.href
      console.log(currentUrl)
    }

    next()
  })
}