<template>
  <div class="container root">
    <div class="toolbar">
      <span class="component" @click="add('text')">文本</span>
      <span class="component" @click="add('img')">图片</span>
      <span class="component" @click="add('qrcode')">二维码</span>
    </div>
    <div class="inner"></div>

    <div class="canvas">
      <canvas style="width: 750px;height: 1334px;" canvas-id="canvas" class="canvas_ele"></canvas>
    </div>
    <div class="setting" :class="{open: setting.open}">
      <span>{{currSettingType}}</span>
      <div class="setting-img" v-if="currSettingType === 'img'">
        <div class="bar">
          <span @click="onToggle(false)">折叠</span>
          <span @click="onToggle(true)">展开</span>
        </div>
        <span>图片参数</span>
        图片名称:
        <input type="text" v-model="currSetting.label" @input="onInputImg(currSetting, 'label')">
        图片地址:
        <input
          type="text"
          v-model="currSetting.value"
          @input="onInputImg(currSetting)">
        x:
        <input type="text" v-model="currSetting.x" @input="onInputImg(currSetting)">
        y:
        <input type="text" v-model="currSetting.y" @input="onInputImg(currSetting)">
        宽度:
        <input type="text" v-model="currSetting.w" @input="onInputImg(currSetting)">
        高度:
        <input type="text" v-model="currSetting.h" @input="onInputImg(currSetting)">
      </div>
      <div class="setting-text" v-if="currSettingType === 'text'">
        <div class="bar">
          <span @click="onToggle(false)">折叠</span>
          <span @click="onToggle(true)">展开</span>
        </div>
        <span>参数</span>
        文本:
        <input type="text" v-model="currSetting.value" @input="onInputText(currSetting)">
        x:
        <input type="text" v-model="currSetting.x" @input="onInputText(currSetting)">
        y:
        <input type="text" v-model="currSetting.y" @input="onInputText(currSetting)">
        字体大小:
        <input
          type="text"
          v-model="currSetting.size"
          @input="onInputText(currSetting)">
        字体颜色:
        <input
          type="text"
          v-model="currSetting.color"
          @input="onInputText(currSetting)">
        <div class="move">
          <button>上</button>
          <button>下</button>
          <button>左</button>
          <button>右</button>
        </div>
      </div>
    </div>
    <div class="stack">
      <div v-for="(ele,i) in eles" :key="i" class="ele" @click="initSetting(ele, i)">
        <text>{{ele.name}}</text>
        <icon type="clear" size="20" color="gray" class="del" @click="remove(i)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eles: [],
      setting: {
        open: false,
        i: -1
      }
    }
  },
  onLoad () {
    const canvasId = 'canvas'
    this.ctx = wx.createCanvasContext(canvasId)
    this.draw()
  },
  computed: {
    // 当前设置
    currSettingType () {
      return this.eles[this.setting.i] ? this.eles[this.setting.i].type : ''
    },
    currSetting: {
      get () {
        return this.eles[this.setting.i] || {}
      },
      set (newValue) {
        this.eles[this.setting.i] = newValue
      }
    }
  },
  methods: {
    initSetting (ele, i) {
      this.setting.open = true
      this.settingData = ele
      this.setting.i = i
    },
    onToggle (bool) {
      this.setting.open = bool
    },
    getDisplayEleName (ele) {
      switch (ele.type) {
        case 'text':
          return '文本:' + ele.value
        case 'img':
          return '图片:' + ele.label
        default:
          break
      }
    },
    // 添加元素
    add (type) {
      const ele = {
        name: '',
        type
      }
      switch (type) {
        case 'text':
          Object.assign(ele, {
            value: '文本',
            x: 0,
            y: 0,
            size: 20,
            color: '#000'
          })
          break
        case 'img':
          Object.assign(ele, {
            label: '图片',
            value: 'http://192.168.1.24:8080/static/canvas-bg.jpg',
            x: 0,
            y: 0,
            w: 0,
            h: 0
          })
          break
        default:
          break
      }

      this.eles.push(ele)
      this.draw()
    },
    // 删除元素
    remove (i) {
      this.eles.splice(i, 1)
      this.draw()
    },
    // text元素处理
    onInputText (ele, e) {
      this.draw()
    },
    updateText (text) {
      this.ctx.setFontSize(text.size)
      this.ctx.setFillStyle(text.color)
      this.ctx.setTextBaseline('top')
      this.ctx.fillText(text.value, text.x, text.y)
      text.name = this.getDisplayEleName(text)
    },
    // 图片元素处理
    onInputImg (img, field) {
      if (field === 'label') {
        img.name = this.getDisplayEleName(img)
      }
      this.draw()
    },
    updateImg (img) {
      img.name = this.getDisplayEleName(img)
      if (!img.value || img.w === 0 || img.h === 0) {
        return Promise.resolve()
      }

      return this.$store.dispatch('wxGetImageData', img.value).then(data => {
        console.log('drawImage', data)
        this.ctx.drawImage(data.path, img.x, img.y, img.w, img.h)
      })
    },
    // 入口
    update (ele) {
      console.log('ele', ele)
      switch (ele.type) {
        case 'text':
          this.updateText(ele)
          break
        case 'img':
          return this.updateImg(ele)
        default:
          break
      }
    },
    draw () {
      this.ctx.draw(true)
      const async = []
      this.eles.forEach(ele => {
        if (ele.type === 'img') {
          async.push(this.update(ele))
        }
      })

      Promise.all(async).then(() => {
        this.eles.forEach(ele => {
          if (ele.type !== 'img') {
            this.update(ele)
          }
        })
        console.log('start.draw')
        this.ctx.draw()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  padding: 0;
}
.component {
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px;
}
.toolbar {
  padding: 10px;
  display: flex;
}
.canvas {
  border: 1px solid #eee;
  width: 375px;
  height: 667px;
}

.setting {
  position: fixed;
  right: -100px;
  top: 40px;
  background-color: #eee;
  padding: 10px;
  transition: all 1s;
}
.open {
  right: 0;
}
.move {
  display: flex;
  button {
    font-size: 14px;
  }
}
input {
  background-color: #fff;
}
.canvas_ele {
  transform: scale(0.5);
  transform-origin: 0 0;
  margin: 0 auto;
}
.stack {
  position: fixed;
  left: 0;
  top: 100px;
  background-color: #eee;
  padding: 10px;
}
.ele {
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  position: relative;
  .del {
    color: #fff;
    position: absolute;
    right: -10px;
    top: -10px;
  }
}
</style>
