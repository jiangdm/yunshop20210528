import cTitle from 'components/title';
import { Toast } from 'vant';
export default {

  data() {
    return {
      mailLanguage:"",
      mailFullReturnTitle:"",
      mailFullReturnAmount:"",
      mailFullReturnName:"",

      order_amount: 0.00,
      return_amount: 0.00,
      status_name: "",
      each_return_rate: 0,
      return_mode: "",
      not_return: 0.00,

      id: "",
      order_sn: "",
      created_at: "",
      finish_time: "",
    };
  },
  activated() {
    this.initMailLanguage();
    this.getData();
    this.init();
  },

  methods: {

    initMailLanguage(){
      this.mailLanguage =this.fun.initMailLanguage() || {full_return: {}};
      this.fun.setWXTitle(this.fun.setMailLanguage("赠送详情",this.mailLanguage.full_return.return_detail));
      this.mailFullReturnTitle=this.fun.setMailLanguage("赠送详情",this.mailLanguage.full_return.return_detail);
      this.mailFullReturnAmount=this.fun.setMailLanguage("已赠送金额",this.mailLanguage.full_return.return_amount);
      this.mailFullReturnName=this.fun.setMailLanguage("赠送",this.mailLanguage.full_return.return_name);
    },

    //初始化数据
    init() {
      this.order_amount = 0.00;
      this.return_amount = 0.00;
      this.status_name = "";
      this.each_return_rate = 0;
      this.return_mode = "";
      this.not_return = 0.00;

      this.id = "";
      this.order_sn = "";
      this.created_at = "";
      this.finish_time = "";
    },

    //获取数据
    getData() {
      let that = this;
      let json = { log_id: this.$route.params.id};
      $http.get("plugin.full-return.frontend.detail.index", json, "加载中").then(function (response) {
        console.log('detail:', response);
        if (response.result == 1) {
          that.amount = response.data.item.amount;
          that.ratio = response.data.item.info.ratio;
          that.info = response.data.item.info;
          that.turnover = response.data.item.info.turnover;
          that.unit_price = response.data.item.info.unit_price;
          that.amount_total = response.data.item.info.amount_total;
          that.amount_surplus = response.data.item.info.amount_surplus;
          that.created_at = response.data.item.created_at;
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        Toast(response);
      });
    },


    goBack() {
      this.$router.go(-1);
    }
  },
  components: { cTitle }

};