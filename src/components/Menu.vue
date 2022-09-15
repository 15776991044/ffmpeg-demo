<template>
  <div>
    <span v-for="(item,index) in pathList" :key="index" class="nav-item">
      <router-link :to="item.path">
        【{{ item.title?item.title:item.name }}】
      </router-link>
    </span>
  </div>

</template>

<script>
import router from '@/router'
export default {
  data() {
    return {
      pathList: []
    }
  },
  mounted() {
    console.log('menu,router', router)
    this.pathList = [...router, { path: '/test1/nino', title: '/test1/nino' }]
  }
}
</script>
<style scoped>
.nav-item{
  display: inline-block;
  padding-right: 30px;
}
</style>
