<template>
  <div class="NavTop">
    <div></div>
    <div>{{Text}}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['Text']

}
</script>
<style lang="scss" scoped>
.NavTop {
  height: 12.889vw;
  background-color: white;
  display: flex;

  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
  .right{
  text-align: right;
  display: block;
  line-height: 12.889vw;
  margin-right: 5.556vw;
  font-size: 3.889vw;
}
}
</style>
