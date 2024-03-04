<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style>
body,
p {
  margin: 0;
}
</style>
