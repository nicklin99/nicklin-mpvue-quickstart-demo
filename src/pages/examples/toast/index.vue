<template>
  <div class="container">
    <div class="inner">
      <button @click="toast">默认toast</button>
      <button @click="toast2">success icon</button>
      <button @click="toast3">loading icon</button>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>
