import cTitle from 'components/title';
import { Toast } from 'vant';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      checkList: [],
      datas: [],
      checkAll: false
    };
  },


  activated() {
    this.toi=this.fun.getKeyByI();
    this.datas=[];
    //获取数据
    this.getData();
  },
  mounted() {
    this.toi=this.fun.getKeyByI();

  },

  methods:{

    //获取数据
    getData() {
      let that = this;
      let json = {"i": this.fun.getKeyByI(), "type": this.fun.getTyep()};

      $http.get('member.member-favorite.index', json).then(function (response) {
        console.log(response);
        if (response.result == 1) {
          that.datas = response.data;
        }

      }, function (response) {
        console.log(response);
      });
    },

    delteteItem(item, i) {
      console.log(i);
      let that = this;
      let json = {goods_id: item.goods.id ,"i": this.fun.getKeyByI(), "type": this.fun.getTyep()};

      $http.get('member.member-favorite.destroy', json, "处理中...").then(function (response) {
        console.log(response);
        if (response.result == 1) {
          that.datas.splice(i, 1);
          Toast("操作成功");
        } else {
          Toast(response.msg);
        }

      }, function (response) {
        console.log(response);
      });

    },

    toItem(goods) {
      //console.log(goods);
      //this.$router.push({ name: 'goods', params: { id: goods.id } ,query:{i:this.toi}});
      this.$router.push(this.fun.getUrl('goods',{id: goods.id}));
    }


    // handleCheckAllChange(event) {

    //   this.checkList = event.target.checked ? this.datasoruce : [];

    // },
    // handleCheckedChange(event) {
    //   console.log(event);

    //   // let checkedCount = value.length;
    //   // this.checkAll = checkedCount === this.datasoruce.length;

    // },
   

    // },
    // delteteAll() {
    //   if (this.checkList.length == this.datasoruce.length) {
   


    //   } else {
    //     return;

    //   }


    // }

  },
  components: { cTitle }
};
