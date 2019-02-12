<script>
/* eslint-disable */
export default {
  // app.json app全局配置
  config: {
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    },
    pages: [
      'pages/index/main',
      'pages/examples/toast/main',
      'pages/examples/modal/main',
      'pages/examples/location/main',
      'pages/examples/audio/main',
      'pages/examples/web/banke/main',
      'pages/request/main',
      'pages/counter/main',
      'pages/examples/main',
      'pages/qrcode/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#eee',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#888',
      selectedColor: '#fa654c',
      backgroundColor: '#fff',
      list: [{
        "pagePath": 'pages/index/main',
        "iconPath": 'assets/tabbar/icon-01.png',
        "selectedIconPath": 'assets/tabbar/icon-01.png',
        "text": '首页'
      },
      {
        "pagePath": 'pages/request/main',
        "iconPath": 'assets/tabbar/icon-01.png',
        "selectedIconPath": 'assets/tabbar/icon-01.png',
        "text": '网络'
      },{
        "pagePath": 'pages/qrcode/main',
        "iconPath": 'assets/tabbar/icon-01.png',
        "selectedIconPath": 'assets/tabbar/icon-01.png',
        "text": '画布'
      },{
        "pagePath": 'pages/examples/main',
        "iconPath": 'assets/tabbar/icon-01.png',
        "selectedIconPath": 'assets/tabbar/icon-01.png',
        "text": '示例'
      }]
    }
  },
  // 全局组件配置
  globalConfig: {
    usingComponents: {}
  },
  onLaunch (options) {
    options.isLaunch = true
    console.log('app.onLaunch.options', options)
  },
  onShow (options) {
    console.log('app.onShow.options', options)
    this.$router.init(options)
    if (options.isLaunch) {
      console.log('小程序启动')
    } else {
      console.log('小程序后台切前台')
    }
  },
  created () {}
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>


<style lang="scss">
button {
  flex: none;
  margin-bottom: 10px;
}
.menu {
  border-bottom: 1px solid #eee;
  background-color: #fff;
  padding-top: 6px;
  padding-bottom: 6px;

  &-section {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  &-label {
    padding-left: 20px;
  }
  &-title {
    padding-left: 20px;
    font-size: 22px;
    margin-bottom: 10px;
  }
}
.inner {
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
}
</style>
