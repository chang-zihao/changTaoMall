<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false, //是否吸顶
      saveY: 0, // 保存离开页面的Y值
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata(); // 请求多个数据
    // 调用3次，请求商品数据，传入类型
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听GoodsListItem里面的图片加载完成的事件
    // this.$bus.$on("itemImageLoad", () => {
    //   console.log("-------");
    //   this.$refs.scroll && this.$refs.scroll.refresh();
    // });

    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  destroyed() {
    // console.log("home被销毁了");
  },
  activated() {
    //进来，滚动到原来的位置，再做一次刷新
    this.$refs.scroll.refresh();
    // console.log("activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 1. 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 2. 取消全局事件监听
    // this.$bus.$off("itemImageLoad",);
  },

  methods: {
    /*
    事件监听相关的方法
    */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 监听点击，回到顶部
    backClick() {
      console.log("backClick");
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 监听内容滚动，拿到滚动位置
    contentScroll(position) {
      // 1. 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2. 决定tabControl 是否吸顶（position: fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 监听上拉事件，上拉加载更多
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    //监听轮播图加载
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /*
    网络请求相关的方法
    */
    // 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求选项卡下面的商品
    getHomeGoods(type) {
      //传入type，
      // 定义一个page，来保存应该请求数据的页码，当请求过后，页码加1，即下次请求下一页。然后把
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        //当请求过后，goods里面的页码加1，即下次请求下一页
        this.goods[type].page += 1;

        // 加载完，调用finishPullUp方法，之后才能再加载
        this.$refs.scroll && this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  /* vh是视口高度 */
  height: 100vh;
}
.home-nav {
  /* position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9; */
  background-color: #ff8198;
  color: #fff;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
}
.tab-control {
  position: relative;
  /* z-index只对定位的元素起效果 */
  z-index: 9;
}
</style>