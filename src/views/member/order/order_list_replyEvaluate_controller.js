import cTitle from 'components/title';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      star: null,
      comment: ''    //评论内容
    };
  },
  methods:
  {
    getStar(value) {
      console.log(value);
    },
    toComment() {
      if (this.comment.length == 0) {

        this.$dialog.confirm({ message: "您还没有输入相关的评论内容"})
          .then(() => {
            this.submitData();
          }).catch(() => {});
      } else {
        this.submitData();

      }


    },
    //提交数据到服务器
    submitData() {
      console.log(this.$route.params.brother);

      if (this.$route.params.from == 0) {
        this.$router.go('member');

      } else {
        this.$route.params.brother.$emit("selected", "2");
        this.$router.go(-1);

      }

    }

  },
  activated () {
    this.toi = this.fun.getKeyByI();
    
  },
  components: { cTitle }
};