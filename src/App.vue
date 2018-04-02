<template>
  <div id="app">
    <search-city-component :clearText="clearSearch" @txtData="searchText"></search-city-component>
    <transition name="list">
      <search-list-component v-if="associateShow" :searchListContent="searchListContent" @changeCity="changeCity"></search-list-component>
    </transition>
    <scroll-base-component ref="suggest" :data="cityList" :probeType="3" :listenScroll="true" @scrollStore="scrollStore" @distance="distance">
      <div>
        <position-box-component :orientate="nowCity" :chooseCity="chooseCity" :historyArr="historyArr" @changeCity="changeCity"></position-box-component>
        <citys-list-component :citysList="cityList" :elementIndex="elementIndex" @singleLetter="singleLetter" @changeCity="changeCity"></citys-list-component>
      </div>
    </scroll-base-component>
    <nav-list-component :cityIndexList="cityIndexList" :flagText="flagText" @toElement="toElement" :elementIndex="elementIndex"></nav-list-component>
    <mask-box-component v-if="maskShow"  :message="maskMessage" @choiceResult="choiceResult"></mask-box-component>
    <transition name="flag">
      <div class="nowFlag" v-if="flag">{{flagText}}</div>
    </transition>
    <!--<router-view/>-->
  </div>
</template>

<script>
import searchCityComponent from './components/search/search'
import ScrollBaseComponent from './base/Scroll'
import positionBoxComponent from './components/position/positionBox'
import citysListComponent from './components/citylist/cityList'
import navListComponent from './components/navlist/navList'
import maskBoxComponent from './components/maskbox/maskBox'
import searchListComponent from './components/searchList/searchList'
import dom from '@/assets/js/dom.js'
import search from '@/assets/js/search.js'
export default {
  name: 'App',
  data () {
    return {
      // 是否清除搜索框内容
      clearSearch: true,
      // 城市列表
      cityList: [],
      cityIndexList: ['顶'], // 右边导航栏列表
      nowCity: '', // 当前所在城市
      chooseCity: '', // 点击即将查看的城市
      chooseCityName: '', // 选择查看的城市
      arrHeight: [], // 高度数组
      flagText: '顶',
      elementIndex: '', // navlist页点击的index
      maskMessage: '', // 弹出框的展示内容
      maskShow: false, // 弹出框是否显示
      historyArr: [], // 查看历史记录
      flag: false, // 字母牌是否显示
      associateShow: false, // 是否开启联想展示框
      searchListContent: [] // 搜索页内容的数组
    }
  },
  components: {
    searchCityComponent,
    ScrollBaseComponent,
    positionBoxComponent,
    citysListComponent,
    navListComponent,
    maskBoxComponent,
    searchListComponent
  },
  created () {
    this.getCityList()
    this.getNowCity()
    this.getHistory()
  },
  methods: {
    getNowCity () {
      this.$http.get('/api/nowcity').then((res) => {
        this.nowCity = res.data.city
        if (!this.chooseCity && !this.chooseCityName) {
          this.chooseCity = this.nowCity
          this.chooseCityName = this.nowCity
        }
      }, () => {
        this.nowCity = '北京'
        this.chooseCity = this.nowCity
        this.chooseCityName = this.nowCity
      })
    },
    getCityList () {
      this.$http.get('/api/cityList').then((res) => {
        this.cityList = res.data.openCityList
        this.cityList.map((item) => {
          this.cityIndexList.push(item[0])
        })
        this.calDomHeight()
      })
    },
    // 计算每个dom的高度
    calDomHeight () {
      let arr = dom.getDistance(this.cityList)
      arr.unshift(250)
      let i = 0
      arr.map(val => {
        i += val
        this.arrHeight.push(i)
      })
    },
    // 搜索框内容
    searchText (text) {
      if (text.length === 0) {
        this.associateShow = false
        return
      }
      this.clearSearch = false
      this.associateShow = true
      this.searchListContent = search.getSearchList(text, this.cityList)
    },
    // 是否显示字牌
    scrollStore (val) {
      this.flag = val
    },
    // 根据滑动的距离显示字母牌上的字
    distance (val) {
      for (let i = 1, len = this.arrHeight.length; i < len; i++) {
        let h1 = this.arrHeight[i - 1]
        let h2 = this.arrHeight[i]
        if (val >= h1 && val < h2) {
          this.flagText = this.cityIndexList[i]
        } else if (val === 0) {
          this.flagText = '顶'
        }
      }
    },
    // 滑动到指定元素
    toElement (item) {
      if (item === '顶') {
        this.$refs.suggest.scrollTo(0, 0, 200)
      }
      this.elementIndex = item
    },
    // 滚动到相应的dom节点
    singleLetter (dom) {
      this.$refs.suggest.scrollToElement(dom, 200, false, false)
    },
    // 点击城市名字，弹出弹窗确认
    changeCity (name) {
      if (this.chooseCityName === name) {
        return false
      }
      // 选择城市的名字
      this.chooseCityName = name
      this.maskMessage = `你确定要选择${name}么？`
      this.maskShow = true
    },
    // 是否切换城市
    choiceResult (flag) {
      if (!flag) {
        this.maskShow = false
      } else {
        this.chooseCity = this.chooseCityName
        this.maskShow = false
        this.local()
        this.associateShow = false
        this.clearSearch = true
        // 当确认后滚动顶部
        this.$refs.suggest.scrollTo(0, 0, 200)
      }
    },
    // 根据定位确定加缓存
    local () {
      if (this.chooseCity !== this.nowCity) {
        this.historyArr.unshift(this.chooseCity)
      }
      if (this.historyArr.length > 2) {
        this.historyArr = this.historyArr.slice(0, 2)
      }
      this.setCity(this.chooseCityName)
    },
    // 存储到本地，正在查看的城市
    setCity (name) {
      localStorage.setItem('seeCity', name)
    },
    // 从本地获取，正在查看的城市
    getCity () {
      let name = localStorage.getItem('seeCity')
      if (!name) {
        this.chooseCity = ''
        this.chooseCityName = ''
      } else {
        this.chooseCity = ''
        this.chooseCityName = ''
      }
    },
    // 存到本地
    setHistory (arr) {
      localStorage.setItem('historyCityArr', arr)
    },
    // 从本地取
    getHistory () {
      let history = localStorage.getItem('historyCityArr')
      if (!history) {
        this.historyArr = []
      } else {
        this.historyArr = history.split(',')
      }
    }
  },
  watch: {
    historyArr: function (val) {
      this.setHistory(val)
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  .nowFlag {
    width: 50px;
    height: 50px;
    background: #4395ff;
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: -25px;
    display: block;
  }
  .flag-enter, .flag-leave {
    transition: all 1s;
  }
  .flag-enter-active, .flag-leave-active {
    opcity: 0;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter {
    opacity: 0;
  }
  .list-leave-to {
    transform: scale(0, 0);
    opacity: 0;
  }
}
</style>
