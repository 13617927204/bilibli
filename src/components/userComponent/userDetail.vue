<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
        <img src="..//../assets/head_img.jpg" v-else/>
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>6</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div  @click="$router.push('/edit')">
          <div class="user_editBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <span>{{userInfo.name}}</span>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo']
}
</script>

<style scoped lang="scss">
.userdetail {
  background-color: white;
  padding: 2vw 3.333vw;
  > div:nth-child(1) {
      margin-top: 5.556vw;
      position: relative;
      top:-30px;
    display: flex;
    .user_img {
      margin-right: 5.556vw;
      img {
        height: 23.611vw;
        width: 23.611vw;
        border-radius: 50%;
      }
    }
    .user_edit {
      flex: 1;
      margin-top: 5.556vw;
      div:nth-child(1) {
        display: flex;
        p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 3.611vw;
          position: relative;
          top:-2.778vw;
          .user_text {
            color: #aaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 0.278vw solid #ccc;
        }
      }
      div:nth-child(2) {
        padding: 0.556vw 2.778vw;
        margin-top:0px;
        .user_editBtn {
          border: 0.278vw solid #fb7a9f;
          padding: 0.833vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fb7a9f;
          border-radius: 1.111vw;
        }
      }
    }
  }
  >div:nth-child(2){
      span{
        font-size: 4.8vw;
        color: #212121;
        max-width: 62.66667vw;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
     p{
         padding: 0;
         margin: 2.778vw 0 0 0;
         color: #999;
         font-size: 3.46667vw;
     }
  }
}

</style>
