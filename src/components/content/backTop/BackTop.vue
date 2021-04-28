<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  methods: {
    backClick() {
      console.log("回到顶部");
    },
  },
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 55px;
}
.back-top img {
  height: 43px;
  width: 43px;
}
</style>