<template>
<div id="picture" class="diypicture"  :style="{'height':datas.params.height,'background-color':datas.params.bgcolor}">
    <div style="line-height: 2.5rem; text-align: center; color: #999; font-size: 16px;" v-show="datas.data == ''">一张图片都没有...</div>
    <div v-for="(d,index) in datas.data" :key="index">
        <a :href="d.hrefurl|href_filters">
            <img :src="d.imgurl" v-show="d.imgurl" />
        </a>
    </div>
</div>

</template>
<script>
export default {
  props: ['datas'],
  data() {
    return {
      mid:this.fun.getKeyByMid()
    };
  },
  mounted(){

  },
  methods:{

  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  #picture {
    position: relative;
    z-index: 99;
    img { width: 100%; }
  }
</style>