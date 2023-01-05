<template>
  <TopMenu />
  <NavigationMenu @path="getPath" />
  <component :is="currentView" />
</template>

<script>
import NavigationMenu from "../src/components/NavigationMenu.vue";
import TopMenu from "../src/components/TopMenu.vue";
import Orders from "../src/components/Orders.vue";

export default {
  data() {
    return {
      currentView: Orders,
    };
  },
  components: {
    TopMenu,
    NavigationMenu,
  },
  methods: {
    getPath(currentView) {
      this.currentView = currentView;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
