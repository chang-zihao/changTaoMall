<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :title="['流行', '新款', '精选']"
    ></tab-control>

    <ul>
      <li>111111111</li>
      <li>22222222</li>
      <li>3333333</li>
      <li>43444444</li>
      <li>555555555</li>
      <li>666666666</li>
      <li>777777777</li>
      <li>88888888</li>
      <li>99999999</li>
      <li>111111111</li>
      <li>22222222</li>
      <li>3333333</li>
      <li>43444444</li>
      <li>555555555</li>
      <li>666666666</li>
      <li>777777777</li>
      <li>88888888</li>
      <li>99999999</li>
      <li>111111111</li>
      <li>22222222</li>
      <li>3333333</li>
      <li>43444444</li>
      <li>555555555</li>
      <li>666666666</li>
      <li>777777777</li>
      <li>88888888</li>
      <li>99999999</li>
      <li>111111111</li>
      <li>22222222</li>
      <li>3333333</li>
      <li>43444444</li>
      <li>555555555</li>
      <li>666666666</li>
      <li>777777777</li>
      <li>88888888</li>
      <li>99999999</li>
      <li>111111111</li>
      <li>22222222</li>
      <li>3333333</li>
      <li>43444444</li>
      <li>555555555</li>
      <li>666666666</li>
      <li>777777777</li>
      <li>88888888</li>
      <li>99999999</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
  },

  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1. 请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>
<style>
#home {
  padding-top: 44px;
}
.home-nav {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: #ff8198;
  color: #fff;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>