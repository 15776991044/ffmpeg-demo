<template>
  <div>
    <Menu v-if="navFlag||true" />
    <router-view />
  </div>
</template>
<script>
import Menu from '@/components/Menu.vue'
import {defineComponent} from 'vue'
export default defineComponent({
  name: "App",
  components:{ Menu },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
