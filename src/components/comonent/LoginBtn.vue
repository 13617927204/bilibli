<template>
  <div class="btnBox" @click="TextClick">
      <div class="btn">
          {{BtnText}}
      </div>
  </div>
</template>

<script>
export default {
  props: ['BtnText'],
  methods: {
    TextClick () {
      this.$emit('TextClick')
    }
  }
}
</script>

<style scoped lang="scss">
.btnBox{
    padding: 5.556vw 2.778vw;
}
.btn{
    height: 12.778vw;
    background-color: #ff9db5;
    border-radius: 6.389vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 5vw;
}
</style>
