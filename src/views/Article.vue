<template>
  <div v-if="model">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video controls="controls" :src="model.content"></video>
      </div>
      <div class="detailinfoText">
        <div>
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <span>{{model.userinfo.name}}</span>
          <span> {{parseInt(Math.random() * 500) + 100}}.4万次观看</span>
          <span>{{parseInt(Math.random() * 3000 + 5000)}}弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div>
          <p @click="collectAttention(0)" :class="collect ? 'activeColor' : ''">
            <van-icon :name="collect ? 'good-job':'good-job-o'" />
            <span>收藏</span>
          </p>
          <p @click="collectAttention(1)" :class="attention ? 'activeColor' : ''">
            <van-icon :name=" attention ? 'star' : 'star-o'" />
            <span>关注</span>
          </p>
          <p>
            <van-icon name="share-o" />
            <span>分享</span>
          </p>
        </div>
      </div>
      <div class="detailparent">
        <home-list
          class="detailitem"
          v-for="(item,index) in commendList"
          :key="index"
          :data="item"
        />
      </div>
      <comment-title :dataLength="lens" ref="commentTitle" @Postcomment="Postcomment" />
      <comment @lengthselect="len => lens = len" @publishClick="publishClick" ref="comment" />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/comonent/NavBar'
import HomeList from './HomeList'
import CommentTitle from '../components/articleComponent/commentTitle'
import comment from '../components/articleComponent/comment'
export default {
  data () {
    return {
      model: null,
      commendList: null,
      lens: null,
      Postcom: {
        comment_content: '',
        comment_date: '',
        parent_id: null,
        article_id: null
      },
      collect: null,
      attention: null
    }
  },
  components: {
    NavBar,
    HomeList,
    CommentTitle,
    comment
  },
  methods: {
    // 获取文章信息
    async articleitemData () {
      const res = await this.$http.get('/article/' + this.$route.params.id)
      this.model = res.data[0]
      this.subscritionInit()
    },
    // 获取推荐文章
    async commendData () {
      const res = await this.$http.get('/commend')
      this.commendList = res.data
    },
    // 点击回复，自动聚焦
    publishClick (id) {
      this.Postcom.parent_id = id
      this.$refs.commentTitle.focusIpt()
    },
    // 发表评论
    async Postcomment (text) {
      if (!text) {
        this.$msg.fail('评论的内容不能为空哦！')
        return
      }
      this.Postcom.comment_content = text
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      this.Postcom.comment_date = `${m}-${d}`
      this.Postcom.article_id = this.$route.params.id
      const res = await this.$http.post(
        '/comment_post/' + localStorage.getItem('id'),
        this.Postcom
      )
      console.log(res.status)
      this.$refs.comment.commentData()
      this.Postcom.parent_id = null
      if (res.status === 200) {
        this.$msg.fail('评论成功啦!')
      } else {
        this.$msg.fail('评论发表失败')
      }
    },
    // 收藏和关注
    async collectAttention (index) {
      if (localStorage.getItem('token')) {
        if (index === 0) {
          const res = await this.$http.post('/collection/' + localStorage.getItem('id'), { article_id: this.$route.params.id })
          if (res.data.msg === '收藏成功') {
            this.collect = true
          } else {
            this.collect = false
          }
          this.$msg.fail(res.data.msg)
        } else {
          const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), { sub_id: this.model.userid })
          if (res.data.msg === '关注成功') {
            this.attention = true
          } else {
            this.attention = false
          }
          this.$msg.fail(res.data.msg)
        }
      }
    },
    // 进入页面获取是否收藏
    async collectionInit () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get(
          '/collection/' + localStorage.getItem('id'),
          {
            params: {
              article_id: this.$route.params.id
            }
          }
        )
        this.collect = res.data.success
      }
    },
    // 进入页面获取是否收藏
    async subscritionInit () {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get(
          '/sub_scription/' + localStorage.getItem('id'),
          {
            params: {
              sub_id: this.model.userid
            }
          }
        )
        this.attention = res.data.success
      }
    }
  },
  created () {
    this.articleitemData()
    this.commendData()
    this.collectionInit()
  },
  watch: {
    $route () {
      this.articleitemData()
      this.commendData()
    }
  }
}
</script>

<style lang="scss" scoped>
.detailinfo {
  background-color: white;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailinfoText {
  padding: 4.167vw;
  div:nth-child(1) {
    span:nth-child(1) {
      padding: 0 2.778vw;
      color: #fb7299;
      background-color: #f4f4f4;
      border-radius: 2.778vw;
    }
  }
  div:nth-child(2) {
    padding: 2.778vw 2.778vw;
    span {
      color: #aaa;
      font-size: 3.333vw;
      margin-right: 2.778vw;
    }
    span:nth-child(1) {
      color: black;
      font-size: 4vw;
      padding-right: 2.778vw;
    }
  }
  div:nth-child(3) {
    padding: 0 2.778vw;
    display: flex;

    p {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #757575;
      span:nth-child(1) {
        margin-right: 3px;
        font-size: 21px;
      }
      span:nth-child(2) {
        font-size: 13px;
      }
    }
    .activeColor {
      color: #fb7299;
    }
  }
}

.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>
