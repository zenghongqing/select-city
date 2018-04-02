<template>
  <div class="city-list">
    <div v-for="citys in citysList" :key="citys[0]">
      <p class="city-title" :ref="citys[0]">{{citys[0]}}</p>
      <p class="city-item" v-for="city in citys[1]" :key="city.id" @click="changeCity(city.name)">{{city.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    citysList: {
      type: Array
    },
    elementIndex: {
      type: String
    }
  },
  created () {
  },
  methods: {
    changeCity (city) {
      this.$emit('changeCity', city)
    }
  },
  watch: {
    elementIndex (val) {
      if (val === '顶') {
        return false
      }
      this.$emit('singleLetter', this.$refs[val][0])
    }
  }
}
</script>
<style lang="scss" scoped>
  .city-list {
    width: 100%;
    background: #fff;
    .city-title {
      height: 30px;
      line-height: 29px;
      border-top: 1px solid #ccc;
      background: #f0efed;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .city-item {
      margin: 0 10px;
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      &:last-child {
        border: none;
      }
    }
  }
</style>
