<template>
  <div class="container">
    <div class="inner">
      <button @click="getLocation">获取地理位置</button>
      <pre>
        {{location}}
      </pre>
    </div>
  </div>
</template>

<script>
import location from 'geolocation/src/wx'
export default {
  data () {
    return {
      location: ''
    }
  },
  onLoad () {

  },
  methods: {
    getLocation () {
      location.start().then(data => {
        this.location = JSON.stringify(data, null, 2)
      }).catch(e => {
        console.log(e)
        if (!e) {
          return wx.openSetting()
        }

        if (e.code === 401) {
          return this.$toast('拒绝授权无法获取地理位置')
        }

        if (e.code === 500) {
          this.$toast(e.message)
        }
      })
    }
  }
}
</script>
