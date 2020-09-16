<template>
  <div class="homelist" @click="pathPush">
    <div class="homelist-icon">
      <span>
        <van-icon name="play-circle-o" />
        {{parseInt(Math.random() * 5000)}}
      </span>
      <span>
        <van-icon name="coupon-o" />
        {{parseInt(Math.random() * 3000)}}
      </span>
    </div>
    <div>
      <img :src="data.img" alt style="width:100%;height:27.778vw;" />
      <p>{{data.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    pathPush () {
      console.log(this.$route)
      if (this.$route.path !== `/article/${this.data.id}`) {
        this.$router.push(`/article/${this.data.id}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.homelist {
  position: relative;
  p {
    font-size: 3.333vw;
    padding: 0.833vw 0;
  }
}
.homelist-icon {
  position: absolute;
  left: 0;
  top: 23.611vw;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 3.889vw;
  color: skyblue;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
}
</style>
