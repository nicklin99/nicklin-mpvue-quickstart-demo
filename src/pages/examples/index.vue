<template>
  <div>
    <div class="menu-section">
      <div class="menu-title">弹窗</div>
      <div class="menu">
        <span class="menu-label" @click="$router.push('toast')">toast</span>
      </div>
      <div class="menu">
        <span class="menu-label" @click="$router.push('modal')">modal</span>
      </div>
    </div>
    <div class="menu-section">
      <div class="menu-title">地理位置</div>
      <div class="menu">
        <span class="menu-label" @click="$router.push('location')">地理位置</span>
      </div>
    </div>
    <div class="menu-section">
      <div class="menu-title">媒体</div>
      <div class="menu">
        <span class="menu-label" @click="$router.push('audio')">音频</span>
      </div>
    </div>
    <div class="menu-section">
      <div class="menu-title">webview</div>
      <div class="menu">
        <span class="menu-label" @click="$router.push('web/banke')">班克</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: '示例',
    backgroundColor: '#eeeeee'
  },
  onTabItemTap (item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  onShow () {
    this.$router.changeTab(this.$mp.page.route)
    console.log(this.$router.current.to)
  }
}
</script>

<style lang="scss" scoped>
</style>
