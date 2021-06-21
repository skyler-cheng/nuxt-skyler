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
import { mapActions } from 'vuex'
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
      console.log(res)
      if(res.status==='success'){
        this.getAuthenticated(res.dataResult)
        cmn.trigger('getData', res.dataResult)
      }
    })
  },
  created() {
    cmn.on('getData', console.log)
  },
  methods: {
    ...mapActions('user',[
        'getAuthenticated'
      ]
    )
  },
}
</script>