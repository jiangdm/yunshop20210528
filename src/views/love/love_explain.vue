<template>
  <div id="love_explain">
    <c-title :hide="false" :text="titlew"></c-title>
    <div style="height: 40px;"></div>
    <div class="text" v-html="content"></div>
  </div>
</template>
<script>
import cTitle from "components/title";
export default {
  data() {
    return {
      // 说明标题
      titlew: "",
      // 爱心值说明
      content: ""
    };
  },
  methods: {
    getBalance() {
      $http
        .get("plugin.love.Frontend.Controllers.explain.index", {}, "加载中")
        .then(
          response => {
            if (response.result === 1) {
              this.content = response.data.content;
              this.titlew = response.data.title;
              this.fun.setWXTitle(this.titlew);
            } else {
              this.$dialog.alert({message:response.msg});
              
            }
          },
          function(response) {
            this.$dialog.alert({message:response.msg});
           
          }
        );
    }
  },
  activated() {
    this.getBalance();
  },
  components: { cTitle }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_explain {
  background: #fff;

  .text {
    padding: 0;
  }
}
</style>
