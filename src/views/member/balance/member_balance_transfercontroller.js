import cTitle from "components/title";
import { Toast } from 'vant';

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      balance: 0,
      info_form: {
        transfer_id: "",
        transfer_money: ""
      },
      transfer_id: "",
      memberInfo: "",
      //余额字样
      balanceLang: this.fun.getBalanceLang()
    };
  },
  watch: {
    transfer_id: function(new_transfer_id) {
      var that = this;
      $http
        .get(
          "member.member.memberInfo",
          {
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep(),
            uid: this.transfer_id
          },
          "获取用户中"
        )
        .then(
          function(response) {
            if (response.result === 1) {
              that.memberInfo = response.data;
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            Toast(response.msg);
          }
        );
    }
  },
  methods: {
    //确认转账
    confirm() {
      var that = this;
      if (
        parseFloat(this.info_form.transfer_money) > parseFloat(this.balance)
      ) {
        that.$dialog.alert({message:"转让金额不可大于您的余额"});

        return;
      }
      if (
        this.transfer_id == undefined ||
        this.transfer_id <= 0 ||
        this.transfer_id.length == 0
      ) {
        that.$dialog.alert({message:"转让id不可为空"});

        return;
      }
      if (
        this.info_form.transfer_money == undefined ||
        this.info_form.transfer_money <= 0 ||
        this.info_form.length == 0
      ) {
        that.$dialog.alert({message:"转让金额不可低于0元"});
        return;
      }
      $http
        .get(
          "finance.balance.transfer",
          {
            i: this.fun.getKeyByI(),
            type: this.fun.getTyep(),
            recipient: this.transfer_id,
            transfer_money: this.info_form.transfer_money
          },
          " "
        )
        .then(
          function(response) {
            if (response.result === 1) {
              that.$dialog.alert({message:response.msg}).then(()=>{
                that.$router.go(-1);
              });

            } else {
              that.$dialog.alert({message:response.msg});

            }
          },
          function(response) {
            // error callback
          }
        );
    },

    getBalence() {
      $http
        .get("finance.balance.member-balance", {}, " ")
        .then(response => {
          console.log(response);
          if (response.result === 1) {
            this.balance = response.data.credit2;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    //this.balance = this.$route.params.balance;
    this.getBalence();
  },
  components: { cTitle }
};
