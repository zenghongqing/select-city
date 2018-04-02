<template>
  <div class="listbox">
    <p class="city-item" v-for="item in searchListContent" :key="item.id" @click="changeCity(item.name)">{{item.name}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    searchListContent: {
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
  .listbox {
    width: 100%;
    background: #fff;
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
