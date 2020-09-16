<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
        <van-swipe-item v-for="(item,index) in images" :key="index">
            <img :src="item" alt="111">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
  data () {
    return {
      images: [
        'https://i0.hdslb.com/bfs/archive/78929693f85d4cdbb4785f14801941195f2b0f59.jpg@880w_388h_1c_95q',
        'https://i0.hdslb.com/bfs/archive/b3deee247b9d7f2ec0e26d44d667ad30071e207a.png@880w_388h_1c_95q',
        'https://i0.hdslb.com/bfs/archive/d98780f905d83ad9e5d7b4befab2e6603fb22a74.png@880w_388h_1c_95q',
        'https://i0.hdslb.com/bfs/sycp/creative_img/202009/df7ebfe17f04a0860d7362ec9557ad83.jpg@880w_388h_1c_95q',
        'https://i0.hdslb.com/bfs/archive/b03629f34b460a38c9d731cd2a97fd020202a3f3.jpg@880w_388h_1c_95q'
      ]
    }
  }
}
</script>

<style lang="scss">
.my-swipe{
    margin-top:2.778vw;
    width:100%;
    img{
        width:100%
    }
}
</style>
