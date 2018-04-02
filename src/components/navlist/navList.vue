<template>
  <div class="nav-body">
    <div class="nav-list" @touchstart.stop.prevent="start" @touchmove.stop.prevent="move">
      <div v-for="(item) in cityIndexList" :data-name="item" :class="{'flag-item': item === flagText}" :key="item.id" class="nav-item">{{item}}</div>
    </div>
  </div>
</template>
<script>
import dom from '../../assets/js/dom'
export default {
  data () {
    return {
      touch: {
        start: 0,
        startIndex: 0,
        end: 0,
        endIndex: 0
      }
    }
  },
  created () {
    console.log(this.flagText)
  },
  props: {
    cityIndexList: {
      type: Array
    },
    flagText: {
      type: String
    },
    elementIndex: {
      type: String
    }
  },
  methods: {
    // 向上触发scroll滚动事件
    scrollToElement (item) {
      this.$emit('toElement', item)
    },
    start (e) {
      let item = dom.handleDomData(e.target, 'data-name')
      this.touch.start = e.touches[0].pageY
      this.touch.startIndex = dom.getIndex(this.cityIndexList, item)
      this.scrollToElement(item)
    },
    move (e) {
      this.touch.end = e.touches[0].pageY
      let distance = this.touch.end - this.touch.start
      this.touch.endIndex = Math.min(Math.max(this.touch.startIndex + Math.floor((distance + 10) / 20), 0), 22)
      this.scrollToElement(this.cityIndexList[this.touch.endIndex])
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-body {
    height: 480px;
    width: 20px;
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -230px;
    padding: 10px 0;
    background: #eee;
    box-sizing: border-box;
    z-index: 90;
    .nav-item {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      user-select: none;
    }
    .flag-item {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #4395ff;
      font-size: 18px;
      user-select: none;
    }
  }
</style>
