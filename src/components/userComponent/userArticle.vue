<template>
  <div class="article">
    <div class="user-article">
      <div>
        <span>动态</span>
        <span>视频</span>
      </div>
    </div>
    <div class="user-hint">
      <div>到达动态的尽头惹～</div>
      <div>
        <p>信息网络传播视听节目许可证：0910417</p>
        <p>网络文化经营许可证 沪网文【2019】3804-274号</p>
        <p>广播电视节目制作经营许可证：（沪）字第01248号</p>
        <p>增值电信业务经营许可证 沪B2-20100043</p>
      </div>
    </div>
    <div class="user-footer">
        <div>
            APP打开
        </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.article{
    background: #fff;
    height:100vh;

}
.user-article {
  display: flex;
  align-items: center;
  background-color: white;
  height: 11.111vw;
  padding: 0 2.778vw;
  border-top: 0.278vw solid #ddd;
  span {
    margin: 0 1.944vw;
    color: #777;
    font-size: 3.46667vw;
  }
}
.user-hint{
    height: 37.778vw;
    background: #f4f4f4;
    text-align: center;
    padding:3.056vw 1.389vw;
    div:nth-child(1){
        font-size: 3.611vw;
        line-height: 11.111vw;
        color: #757575;
    }
    div:nth-child(2){
        color: #999;
        font-size:3.333vw;
        line-height: 6.4vw;
    }
}
.user-footer{
    position: relative;
    div{
        position: fixed;
        bottom: 7.46667vw;
        z-index: 15;
        width: 32.26667vw;
        height: 10.13333vw;
        line-height: 10.13333vw;
        border-radius: 6.66667vw;
        left: 30.66667vw;
        background: #fb7299;
        color: #fff;
        text-align: center;
        font-size: 4vw;
    }
}
</style>
