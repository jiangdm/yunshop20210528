<template>
  <div id="showsign">
    <img :src="signdata.bgimg" style="width: 100%; height: 100%; display: block;" />
    <div @click="signnow" v-bind:style="{ background: signdata.bgcolor }">
      <h1
        :style="{
          color: signdata.textcolor,
          'font-weight': signdata.fontweight,
          'font-size': signdata.fontsize
        }"
      >
        {{ signdata.text }}
      </h1>
      <span>{{ signdata.button_hint }}</span>
    </div>
    <header>
      <span>今日签到奖励 :{{ signdata.award_content }}</span>
    </header>
  </div>
</template>
<script>
export default {
  props: ['datas'],
  data() {
    return {
      signdata: {},
      clickTag: false
    };
  },
  mounted() {
    this.signdata = this.datas.params;
  },
  methods: {
    signnow() {
      if (this.clickTag) {
        //防止快速点击
        return;
      }
      if (this.signdata.sign_status) {
        return;
      } else {
        this.clickTag = true;
        $http.get('plugin.sign.Frontend.Modules.Sign.Controllers.sign.sign').then(res => {
          this.$dialog.alert({message:'签到成功'});
          
        });
      }
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#showsign {
  width: 100%;
  height: 7.7rem;
  z-index: 100;
  position: relative;

  div {
    width: 4.7rem;
    height: 4.7rem;
    border-radius: 50%;
    position: absolute;
    top: 0.3rem;
    left: 37.9%;

    h1 {
      margin: 0.7rem 0 0.5rem 0;
    }
  }

  header {
    width: 100%;
    position: absolute;
    top: 5.5rem;
    left: 0;
    color: #fff;
    height: 1.9rem;

    span {
      display: inline-block;
      line-height: 1.9rem;
      background: rgba(138, 138, 138, 0.4);
      padding: 0 0.5rem;
      border-radius: 0.5rem;
    }
  }
}
</style>
