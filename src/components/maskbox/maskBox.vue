<template>
  <div class="mask-box">
    <div class="mask-body"></div>
    <div class="btn-box">
      <div class="message">
        <p>{{message}}</p>
      </div>
      <div class="btn-left" @click="cancel">取消</div>
      <div class="btn-right" @click="sure">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    message: {
      type: String
    }
  },
  methods: {
    cancel () {
      this.$emit('choiceResult', false)
    },
    sure () {
      this.$emit('choiceResult', true)
    }
  }
}
</script>
<style lang="scss" scoped>
  .mask-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mask-body {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.2;
      z-index: 200;
    }
    .btn-box {
      width: 300px;
      height: 155px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      border-radius: 8px;
      z-index: 300;
      .message {
        width: 100%;
        height: 100px;
        border-radius: 8px 8px 0 0;
        line-height: 22px;
        text-align: center;
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .btn-left {
        float: left;
        width: 140px;
        height: 45px;
        margin-left:6px;
        border-radius:8px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 46px;
        font-size: 16px;
        font-weight: 700;
      }
      .btn-right {
        float: right;
        width: 140px;
        height: 45px;
        margin-right: 6px;
        border-radius: 8px;
        background: #00B7FF;
        border: 1px solid #00B7FF;
        text-align: center;
        line-height: 46px;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
      }
    }
  }
</style>
