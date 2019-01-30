<template>
  <div class="container">
    <div class="inner">
      <button @click="onClickPlayAudio">播放音频</button>
    </div>
  </div>
</template>


<script>
export default {
  config: {
    navigationBarTitleText: '音频播放演示'
  },
  onLoad () {
    // 音频资源的加载类似图片加载，都是异步，在 onLoad先做加载
    this.audio = wx.createInnerAudioContext()
    this.audio.src = 'https://act.birdpush.com/njaiso/static/audio/jb.wav'
  },
  onUnload () {
    // 注意页面卸载时候销毁audio对象，释放内存
    this.audio.destroy()
  },
  methods: {
    onClickPlayAudio () {
      this.audio.play()
    }
  }
}
</script>
