<template>
  <div class="search-box">
    <div class="ipt-box">
      <input type="text" class="ipt" placeholder="城市名称/拼音" v-model="searchText" @keydown="entry()">
      <div class="icon-box">
        <i class="iconfont icon-sousuo icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchText: '',
      timer: null
    }
  },
  props: {
    clearText: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 清楚搜索内容
    clearText (val) {
      if (val) {
        this.searchText = ''
        this.entry()
      }
    }
  },
  methods: {
    // 延时搜索
    entry () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$emit('txtData', this.searchText)
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-box {
    height: 50px;
    background: #4395FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .ipt-box {
      width: 80%;
      position: relative;
      .ipt {
        display: block;
        width: 100%;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 20px;
        padding-left: 40px;
        line-height: 40px;
        font-size: 14px;
        box-sizing: border-box;
      }
      .icon-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 40px;
        z-index: 50;
        line-height: 40px;
        text-align: center;
        .icon {
          font-size: 22px;
          font-weight: 900;
          color: #4395ff;
        }
      }
    }
  }
</style>
