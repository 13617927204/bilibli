<template>
  <div>
    <nav-bar />
    <div class="uploadfile">
      <div class="uploadimg">
        <van-uploader preview-size="100vw" :after-read="afterRead"/>
      </div>
      <edit-banner left="头像" style="">
        <img :src="modul.user_img" alt v-if="modul.user_img" slot="right" />
        <img src="../assets/default_img.jpg" slot="right" alt v-else />
      </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="show = true">
      <span slot="right">{{modul.name}}</span>
    </edit-banner>
    <edit-banner left="UID">
      <span slot="right">{{modul.id}}</span>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="gendershow = true">
      <span slot="right">{{modul.gender === '1' ? '男' : '女'}}</span>
    </edit-banner>
    <edit-banner left="个性签名" @bannerClick="textshow = true">
      <span slot="right">{{modul.user_desc}}</span>
    </edit-banner>

      <van-dialog v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="content = ''"
      >
          <van-field v-model="content"  autofocus />
      </van-dialog>

      <van-dialog v-model="textshow"
      title="个性签名"
      show-cancel-button
      @confirm="textareaClick"
      @cancel="content = ''"
      >
          <van-field v-model="content" type="textarea"  autofocus />
      </van-dialog>

      <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />

    <div class="edit-btn">
      <div @click="quitLogin">退出登录</div>
      <div @click="$router.back()">返回空间</div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/comonent/NavBar'
import EditBanner from '../components/editCommonent/EditBanner'
export default {
  components: {
    NavBar,
    EditBanner
  },
  data () {
    return {
      modul: {},
      show: false,
      textshow: false,
      gendershow: false,
      content: '',
      actions: [
        {
          name: '男', value: 1
        },
        {
          name: '女', value: 0
        }
      ]
    }
  },
  methods: {
    async acquireUser () {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      //   console.log(res)
      this.modul = res.data[0]
    },
    async afterRead (file) {
      const fromdata = new FormData()
      fromdata.append('file', file.file)
      const res = await this.$http.post('/upload', fromdata)
      this.modul.user_img = res.data.url
      this.UserUpdate()
    },
    confirmClick () {
      this.modul.name = this.content
      this.UserUpdate()
      this.content = ''
    },
    textareaClick () {
      this.modul.user_desc = this.content
      this.UserUpdate()
      this.content = ''
    },
    onSelect (data) {
      this.modul.gender = data.val
      this.UserUpdate()
      this.gendershow = false
    },
    quitLogin () {
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    },
    async UserUpdate () {
      const res = await this.$http.post('/update/' + localStorage.getItem('id'), this.modul)
      if (res.data.code === 200) {
        this.$msg.fail('修改成功')
      }
    }
  },
  created () {
    this.acquireUser()
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 12.222vw;
  height: 12.222vw;
  border-radius: 50%;
}
.edit-btn {
  background: #fff;
  margin-top: 5.556vw;
  text-align: center;
  div {
    padding: 2.66667vw;
    text-align: center;
    color: #505050;
    text-decoration: none;
    background: #fff;
    font-size: 3.73333vw;
  }
  div:nth-child(1) {
    border-bottom: 0.278vw solid #eee;
  }
}
.uploadfile{
    position: relative;
    overflow: hidden;
    margin-top:5.556vw;
    .uploadimg{
        position: absolute;
        opacity: 0;
    }
}
</style>
