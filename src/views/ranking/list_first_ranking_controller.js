import cTitle from 'components/title';
export default {

  data() {
    return {
      action:"",
      nextAction:"",
      datas: [],
      title:"排行榜",
    };
  },

  activated() {
    this.action="";
    this.datas = [];

    this.action=this.$route.params.action;
   
    if(!this.fun.isTextEmpty(this.$route.params.title)){
      this.title=this.$route.params.title;
    }

    this.getData();//获取数据
  },

  mounted() {
    
  },

  methods: {
    //获取数据
    getData() {
      let that = this;
      let json = { 'data[ranking_info_class]': this.action,'data[key]':this.$route.params.key};
      $http.get('plugin.ranking.api.ranking.get-ranking-info', json, "加载中...").then(function (response) {
        console.log(response);
        if (response.result == 1) {
          that.datas = response.data;
          
        } else {
          console.log(response.msg);
        }

      }, function (response) {
        console.log(response);
      });
    },


  },
  components: { cTitle }
};