<template>
  <div class="search-list">
    <scroll :data="searchListContent">
      <city-item :searchListContent="searchListContent" @changeCity="changeCity"></city-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../base/Scroll'
import CityItem from '../../base/cityItem'
export default {
  data () {
    return {}
  },
  created () {
    console.log(this.searchListContent)
  },
  components: {
    Scroll,
    CityItem
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
  .search-list {
    width: 100%;
    background: #f5f5f5;
    height:calc(100% - 50px);
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 100;
    overflow: hidden;
  }
</style>
