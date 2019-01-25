<template>
  <div class="container">
    <div class="inner">
      <button @click="modal">默认modal</button>
      <button @click="modal2">modal + title + content</button>
      <button @click="modal3">modal按钮点击回调</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    modal () {
      this.$modal('默认modal')
    },
    modal2 () {
      this.$modal('我是一个modal', '你好你好')
    },
    modal3 () {
      this.$modal('title').then(() => {
        console.log('点了确定')
      }).catch(() => {
        console.log('点了取消')
      })
    }
  }
}
</script>
