<template>
  <div class="page">
    <z-title title="活动通知"></z-title>

    <div class="wrapper">
      <p class="title">{{title}}</p>
      <p class="time">{{time}}</p>
      <div class="content" v-html="content">

      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from "vant";
import zTitle from "./title.vue";

export default {
  components: { zTitle },
  data() {
    return {
      title: "",
      time: "",
      content: ""
    };
  },
  async activated() {
    let res = await $http.get("plugin.instation-message.api.message.get-message-detail", {
      id: this.$route.query.id
    });
    if (res.result !== 1) {
      Toast(res.msg);
      return;
    }
    this.title = res.data.title;
    this.time = res.data.created_at;
    this.content = res.data.content;
    console.log(res.data);


  },
  methods: {}
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .page {
    background: rgb(250, 250, 250);
    min-height: 100vh;
    padding-bottom: 3.0625rem;
    text-align: left;
  }

  .wrapper {
    padding: 0.719rem 1.031rem 1rem 0.969rem;

    .title {
      color: #000;
      font-size: 1rem;
      letter-spacing: 0.025rem;
    }

    .time {
      margin-top: 1.063rem;
      color: #999;
      letter-spacing: 0.022rem;
      font-size: 0.875rem;
    }

    .content {
      margin-top: 1.063rem;
    }
  }

</style>