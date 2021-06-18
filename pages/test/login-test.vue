<template>
    <div id="wrapper">

        <!-- Header -->
        <Header></Header>

        <!-- Menu -->
        <Menu></Menu>

        <!-- Main -->
        <div id="main">
            登入測試
        </div>

        <!-- Footer -->
        <Footer></Footer>

    </div>
</template>
<script>
import Header from '~/components/Header.vue';
import Menu from '~/components/Menu.vue';
import Footer from '~/components/Footer.vue';
import cmn from '~/utils/'
export default {
  layout: 'front',
  head: {
    title: '登入測試'
  },
  components:{
    Header,
    Menu,
    Footer
  },
  mounted () {
    this.$timelinkerApi.$post('/timelinker-api/user/login', {
      account: 'taiwan.hare@gmail.com',
      password: 'hare'
    }).then(res => {
      cmn.setStore('user', res)
      cmn.trigger('getData', res)
    })
  },
  created() {
    cmn.on('getData', console.log)
  },
}
</script>