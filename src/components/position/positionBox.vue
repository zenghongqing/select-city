<template>
  <div class="position-box">
    <div class="choose">
      <span>你已选择：{{chooseCity}}</span>
    </div>
    <div class="history">
      <p>定位/最近访问</p>
      <div class="citybox">
        <button>
          <i class="iconfont icon-dingwei"></i>{{orientate}}
        </button>
        <button v-for="place in historyArr" :key="place">{{place}}</button>
      </div>
    </div>
    <div class="hot-city">
      <p>热门城市</p>
      <div class="citybox">
        <button v-for="city in hotCitys" :key="city" @click="changeCity(city)">{{city}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hotCitys: [
        '北京', '上海', '广州', '深圳', '天津', '西安', '重庆', '杭州', '南京'
      ]
    }
  },
  props: {
    orientate: {
      type: String,
      default: ''
    },
    chooseCity: {
      type: String
    },
    historyArr: {
      type: Array
    }
  },
  methods: {
    changeCity (name) {
      this.$emit('changeCity', name)
    }
  }
}
</script>
<style lang="scss" scoped>
  .position-box {
    position: relative;
    padding-bottom: 10px;
    .choose {
      height: 40px;
      border-top: 2px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      line-height: 37px;
      background: #fdfdfd;
      span {
        font-weight: 700;
        padding-left: 10px;
      }
    }
    .history {
      height: 70px;
      box-sizing: border-box;
      padding: 0 10px;
      p {
        line-height: 30px;
        font-weight: 900;
        color: #666;
      }
      .citybox {
        height: 40px;
        box-sizing: border-box;
        padding-top: 5px;
        button {
          box-sizing: border-box;
          border: 1px solid #ddd8ce;
          border-radius: 4px;
          outline: none;
          width: 26%;
          height: 30px;
          margin: 0 3.6%;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 900;
          font-size: 14px;
          .iconfont {
            color: #4395ff;
          }
        }
      }
    }
    .hot-city {
      height: 130px;
      box-sizing: border-box;
      padding: 0 10px;
      p {
        height: 30px;
        line-height: 30px;
        font-weight: 900;
        color: #666;
      }
      .citybox {
        height: 100px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        button {
          height: 30px;
          width: 26%;
          margin: 0 3.6%;
          float: left;
          border: 1px solid #ddd8ce;
          outline: none;
          background: #fdfdfd;
          color: #666;
          font-size: 14px;
          border-radius: 4px;
        }
      }
    }
  }
</style>
