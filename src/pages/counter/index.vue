<template>
  <div class="counter-warp container">
    <div class="inner">
      <p>Vuex counter：{{ count }}</p>
      <p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </p>
    </div>
    <div @click="$router.back()" class="home">返回首页</div>
  </div>
</template>

<script>
// Use Vuex

export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    }
  }
}
</script>

<style>
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
