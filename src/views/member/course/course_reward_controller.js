import cTitle from "components/title";

export default {
  data() {
    return {
      rewardInfo: []
    };
  },

  mounted() {},

  methods: {
    //获取打赏信息
    getRewardInfo() {
      $http
        .get("plugin.video-demand.api.video-demand-member.get-me-reward")
        .then(response => {
          console.log(response);
          if (response.result === 1 && !this.fun.isTextEmpty(response.data)) {
            this.rewardInfo = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoDetail(id) {
      this.$router.push(this.fun.getUrl("CourseDetail", { id: id }));
    }
  },
  activated() {
    this.rewardInfo = [];
    this.getRewardInfo();
  },

  components: { cTitle, }
};
