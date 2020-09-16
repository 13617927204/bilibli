<template>
  <div style="background:#fff">
    <nav-bar />
    <div class="tabbar">
      <div class="tab-set" @click="$router.push('/editCategory')">
        <van-icon name="setting-o" />
      </div>
      <van-tabs v-model="active" swipeable sticky animated class="van-tabs">
        <van-tab :title="item.title" v-for="(item,index) in tabbarList" :key="index">
          <home-swiper/>
                    <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
            style="margin-top:10px"
            v-if="isLoading"
          >
            <div class="detailparent">
              <home-list
                class="detailitem"
                :data="listitem"
                v-for="(listitem,listindex) in item.list"
                :key="listindex"
              />
            </div>
          </van-list>
          <van-loading size="24px" vertical v-else>加载中...</van-loading>
        </van-tab>
      </van-tabs>
    </div>
    <div class="btn">打开App，看你感兴趣的视频</div>
  </div>
</template>

<script>
import NavBar from '../components/comonent/NavBar'
import HomeList from './HomeList'
import HomeSwiper from '../components/HomeComonent/HomeSwiper'
export default {
  components: {
    NavBar,
    HomeList,
    HomeSwiper
  },
  data () {
    return {
      active: 0,
      tabbarList: [],
      isLoading: false
    }
  },
  activated () {
    if (localStorage.getItem('newCat')) {
      const newCat = JSON.parse(localStorage.getItem('newCat'))
      this.tabbarList = this.changeTabbarList(newCat)
      this.selectArticle()
    }
  },
  methods: {
    async selectTabbarList () {
      if (localStorage.getItem('newCat')) {
        return
      }
      const res = await this.$http.get('/category')
      this.tabbarList = this.changeTabbarList(res.data)
      this.selectArticle()
    },
    changeTabbarList (data) {
      return data.map((item) => {
        item.list = []
        item.pagesize = 10
        item.page = 0
        item.finished = false
        item.loading = false
        return item
      })
    },
    tabbarListItem () {
      return this.tabbarList[this.active]
    },
    async selectArticle () {
      const tabbarlistitem = this.tabbarListItem()
      const res = await this.$http.get('/detail/' + tabbarlistitem._id, {
        params: {
          page: tabbarlistitem.page,
          pagesize: tabbarlistitem.pagesize
        }
      })
      this.isLoading = true
      tabbarlistitem.list.push(...res.data)
      tabbarlistitem.loading = false
      if (res.data.length < tabbarlistitem.pagesize) {
        tabbarlistitem.finished = true
      }
    },
    onLoad () {
      const tabbarlistitem = this.tabbarListItem()
      setTimeout(() => {
        tabbarlistitem.page++
        this.selectArticle()
      }, 1000)
    }
  },
  watch: {
    active () {
      const tabbarlistitem = this.tabbarListItem()
      if (!tabbarlistitem.list.length) {
        this.selectArticle()
      }
    }
  },
  created () {
    this.selectTabbarList()
  }
}
</script>

<style lang="scss" scoped>
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
.btn {
  position: fixed;
  bottom: 8vw;
  z-index: 15;
  width: 93.6vw;
  height: 9.6vw;
  line-height: 9.6vw;
  border-radius: 6.66667vw;
  background: #fb7299;
  color: #fff;
  left: 3.2vw;
  text-align: center;
  font-size: 3.73333vw;
  -webkit-box-shadow: 0 0.53333vw 2.66667vw rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.53333vw 2.66667vw rgba(0, 0, 0, 0.2);
  img {
    display: inline-block;
    width: 50px;
  }
}
.tabbar {
  position: relative;
  .tab-set {
    position: absolute;
    z-index: 99;
    background: #fff;
    right: 0;
    width: 52px;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
}
</style>
