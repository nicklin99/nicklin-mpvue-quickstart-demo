<template>
  <div class="container">
    <div class="inner">
      <button @click="toast">默认toast</button>
      <button @click="toast2">success icon</button>
      <button @click="toast3">loading icon</button>
      <button @click="toast4">错误示范</button>
    </div>
  </div>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: 'toast演示'
  },
  methods: {
    toast () {
      this.$toast('默认toast')
    },
    toast2 () {
      this.$toast('title', {
        icon: 'success'
      })
    },
    toast3 () {
      this.$toast('title', {
        icon: 'loading'
      })
    },
    toast4 () {
      var s = null
      this.$toast(s.message)
    }
  }
}
</script>
