// import { mapState } from "vuex";
import cTitle from "components/title";
import { Toast } from 'vant';

const SUBMIT_ACTION_CART = "-1"; //添加到购物车
// const SUBMIT_ACTION_BUY = "-2"; //立即购买
// let isfirst = true;
export default {
  data() {
    return {
      integral: window.localStorage.integral || '积分',
      selectBol: true,
      edit: false,
      cartDelete: false,
      //租赁cartDelete
      rentDelete: false,
      checkList: [],
      allCheckList: [],
      //租赁allchecklist
      allRentCheckList: [],
      goods: [],
      //租赁goods
      rentGoods: [],
      checkAll: false,
      //租赁checkAll
      rentCheckAll: false,
      total: 0.0,
      count: 0,

      //租赁总价格和数量
      rentTotal: 0.0,

      rentCount: 0,

      isShowList: false,

      //租赁列表显示

      isShowListRent: false,

      //租赁checklist
      // rentCheckList:[],

      //tab点击active类
      tabActive: "pay",

      //控制租赁tab显示
      isRentTab: false,

      //结算标识
      submitFlag: "",

      //购物车商品列表数组

      rentGoodList: [],

      //最近热租商品
      hotRentList: [],

      //选中租赁商品
      rentCheckList: [],

      showChoose: false,
      radioChoose: '',
      dispatch_types: [],
      chooseType: ''
    };
  },
  activated() {
    this.initView(); //初始化数据
    this.getData();
    // this.fun.setWXTitle($i18n.t('cart.购物车'));
    // if (this.isRentTab && !isfirst) {
    //   this.getRentData();
    //   this.getHotRent();
    // }
  },

  mounted() {
    // this.rentPluginOpen();
    // isfirst = false;
    //this.$store.commit('cfoots', { a: false });
  },

  methods: {
    selectBolfun: function(num) {
      if (num == 1) {
        this.selectBol = true;
      } else {
        this.selectBol = false;
      }
    },

    //初始化view
    initView() {
      this.selectBol = true;
      this.edit = false;
      this.cartDelete = false;
      this.rentDelete = false;
      this.checkList = [];
      this.allCheckList = [];
      this.goods = [];
      this.rentGoods = [];
      this.checkAll = false;
      this.rentCheckAll = false;
      this.total = 0.0;
      this.count = 0;
      this.rentTotal = 0.0;
      this.rentCount = 0;
      this.isShowList = false;

      this.isShowListRent = false;
      this.showChoose = false;
      this.radioChoose = '';
      this.dispatch_types = [];
    },

    //获取数据
    getData() {
      $http.get("member.member-cart.get-member-cart", {}, "loading").then((response) => {
        if (response.result === 1) {
          this.goods = response.data.cart;
          this.allCheckListInit(this.goods);
          this.rentPluginOpen(response.data);
        } //else {
        //}
      },
      function(response) {
        console.log(response);
      }
      );
    },

    //初始化全选数据
    allCheckListInit(data) {
      if (data.length) {
        this.isShowList = true;
      }
      // this.allCheckList = data;

      //取得购物车数据
      this.allCheckList = data;

      //取得租赁购物车数据
      // this.rentCheckList= data;
    },

    //全选
    allSelect(event) {
      if (this.selectBol) {
        console.log("全选");
        // this.checkList = event.target.checked ? this.allCheckList : [];
        //因为改变组件
        this.checkList = event ? this.allCheckList : [];
        for(let i =0;i<this.checkList.length;i++){
          if( this.checkList[i].goods.stock_status != 0){
            this.checkList[i].goods.price = 0;
          }
        }
        // console.log(this.allCheckList);
        console.log(this.checkList);
        //计算总价格
        this.countTotalPrice();
      }
    },

    //全选监听
    allSelectHandle(value) {
      // console.log(value.length);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.goods.length;
      // console.log(this.checkList);
      //计算总价格
      this.countTotalPrice();
    },

    //单选
    selectGood(value) {
      //console.log("单选中");
      //console.log(value);
    },

    //改变数量接口操作
    changeNumber(goods, _num) {
      console.log(goods);
      let that = this;
      let json = {
        id: goods.id,
        num: _num,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };

      $http.get("member.member-cart.updateNum", json, "").then(
        function(response) {
          console.log(response);
          if (response.result == 1) {
            if (_num > 0) {
              that.addNumberView(goods);
            } else {
              that.deleteNumberView(goods);
            }
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    //添加处理view
    addNumberView(goods) {
      for (var i = 0; i < this.checkList.length; i++) {
        if (goods.id == this.checkList[i].id) {
          if (this.checkList[i].total > 0) {
            // this.checkList[i].total = this.checkList[i].total + 1;
            this.checkList[i].total = Number(this.checkList[i].total) + 1;
            this.countTotalPrice(); //计算总价格
            return;
          }
        }
      }

      for (var j = 0; j < this.goods.length; j++) {
        if (goods.id == this.goods[j].id) {
          if (this.goods[j].total > 0) {
            // this.goods[i].total = this.goods[i].total + 1;
            this.goods[j].total = Number(this.goods[j].total) + 1;
            break;
          }
        }
      }
    },
    //添加
    addNumber(goods) {
      //网络操作后处理
      this.changeNumber(goods, 1);
    },

    //减少View处理
    deleteNumberView(goods) {
      for (var i = 0; i < this.checkList.length; i++) {
        if (goods.id == this.checkList[i].id) {
          if (this.checkList[i].total > 1) {
            // this.checkList[i].total = this.checkList[i].total - 1;
            this.checkList[i].total = Number(this.checkList[i].total) - 1;
            this.countTotalPrice(); //计算总价格
            return;
          }
        }
      }

      for (var s = 0; s < this.goods.length; s++) {
        if (goods.id == this.goods[s].id) {
          if (this.goods[s].total > 1) {
            // this.goods[i].total = this.goods[i].total - 1;
            this.goods[s].total = Number(this.goods[s].total) - 1;
            break;
          }
        }
      }
    },

    //减少
    deleteNumber(goods) {
      if (goods.total == 1) {
        return;
      }
      //网络操作后处理
      this.changeNumber(goods, -1);
    },

    //界面操作
    onCartDelete() {
      this.cartDelete = !this.cartDelete;
      this.checkList = []; //清空数据源
      this.checkAll = false; //恢复view
      this.allCheckList = this.goods; //重置全选数据
      this.countTotalPrice(); //计算价格总数
      if (this.goods.length == 0) {
        this.isShowList = false;
      }
    },

    //删除商品
    deleteGoods() {
      if (this.checkList.length == 0) {
        Toast("请选择删除商品");
        console.log("请选择删除商品");
        return;
      }

      //删除网络操作
      let that = this;
      let _ids = [];
      for (var i = 0; i < this.checkList.length; i++) {
        _ids.push(this.checkList[i].id);
      }
      console.log(_ids);
      //let json = { ids: JSON.stringify(_ids) };
      let json = {
        ids: _ids,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };
      $http.get("member.member-cart.destroy", json, "操作中").then(
        function(response) {
          console.log(response);
          if (response.result == 1) {
            that.deleteGoodsView();
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    //删除后View操作
    deleteGoodsView() {
      if (this.checkAll) {
        this.goods = []; //清空数据源
        this.checkList = []; //清空数据源
        this.allCheckList = []; //全选数据
      } else {
        for (var i = 0; i < this.checkList.length; i++) {
          for (var j = 0; j < this.goods.length; j++) {
            console.log(this.goods[j].id);
            if (this.goods[j].id == this.checkList[i].id) {
              this.goods.splice(j, 1);
              break;
            }
          }
        }
        this.checkList = []; //清空

        console.log(this.goods);
        console.log(this.checkList);
      }

      this.onCartDelete(); //操作界面
    },

    //计算总价格&总数
    countTotalPrice() {
      this.count = 0; //初始化
      this.total = 0.0; //初始化
      this.count = this.checkList.length;
      for(let i =0;i<this.checkList.length;i++){
        if( this.checkList[i].goods.stock_status != 0){
          this.count--;
        }
      }

      for (let i = 0; i < this.checkList.length; i++) {
        if(!this.checkList[i].goods.point_goods) {
          this.total += this.checkList[i].goods.price * this.checkList[i].total;
        }
      }

      this.total = Number(this.total.toString().match(/^\d+(?:\.\d{0,2})?/));
    },
    checkGoods(str) {
      let url = "";
      this.chooseType = str;
      if(str === 'rent' && this.rentCheckList.length == 0) {
        Toast("请选择结算商品");
        return;
      }else if (str !== 'rent' && this.checkList.length == 0) {
        Toast("请选择结算商品");
        return;
      }

      let _cart_ids = [];
      if(str === 'rent') {
        url = "plugin.lease-toy.api.checkout.index";
        for (let i = 0; i < this.rentCheckList.length; i++) {
          if( this.rentCheckList[i].goods.stock_status == 0){
            _cart_ids.push(this.rentCheckList[i].id);
          }
        }
      }else {
        url = "memberCart.checkout";
        for (let i = 0; i < this.checkList.length; i++) {
          if( this.checkList[i].goods.stock_status == 0){
            _cart_ids.push(this.checkList[i].id);
          }
        }
      }


      $http.get(url, {cart_ids: _cart_ids.join(',')}, "操作中").then(
        (response)=> {
          if (response.result == 1) {
            if(response.data.need_choose == 1) {
              this.dispatch_types = response.data.dispatch_types;
              this.showChoose = true;
            }else {
              if(str === 'rent') {
                this.rentSubmitGoods();
              }else {
                this.submitGoods();
              }
            }
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    toBuy() {
      if(this.chooseType === 'rent') {
        this.rentSubmitGoods();
      }else {
        this.submitGoods();
      }
    },

    //提交订单
    submitGoods() {
      let _cart_ids = [];
      if (this.showChoose && !this.radioChoose) {
        Toast("请先选择配送方式");
        return;
      }

      if(this.showChoose) {
        // 配送方式有冲突
        for (let i = 0; i < this.dispatch_types[this.radioChoose].member_carts.length; i++) {
          _cart_ids.push(this.dispatch_types[this.radioChoose].member_carts[i].id);
        }
      }else {
        for (let i = 0; i < this.checkList.length; i++) {
          if( this.checkList[i].goods.stock_status == 0){
            _cart_ids.push(this.checkList[i].id);
          }
        }
      }

      this.$router.push(
        this.fun.getUrl("goodsorder",{}, {
          tag: SUBMIT_ACTION_CART,
          cart_ids: _cart_ids.join(',')
        })
      );
    },

    //跳转商品详情
    toGoodsInfo(goods) {
      this.$router.push(
        this.fun.getUrl("goodsO2O", {
          id: goods.goods_id,
          o2o: "o2o",
          tag: -1,
          store_id: -1
        })
      );
    },

    //租赁

    //判断租赁插件是否开启
    rentPluginOpen(data) {
      // $http
      //   .get("plugin.lease-toy.api.lease-toy.whether-enabled", {})
      //   .then(response => {
      if (data.is_lease == 1) {
        this.isRentTab = true;
        // this.tabActive = "rent";
        this.getRentData(data);
        this.getHotRent(data);
      } else {
        this.isRentTab = false;
        this.tabActive = "pay";
      }
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    //获取租赁列表
    getRentData(data) {
      // $http
      //   .get("plugin.lease-toy.api.member-cart.index", {})
      //   .then(response => {
      this.rentGoods = data.lease_cart;
      this.rentAllCheckListInit(this.rentGoods);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    //初始化全选数据
    rentAllCheckListInit(data) {
      if (data.length) {
        this.isShowListRent = true;
      }
      this.allRentCheckList = data;
    },

    //全选
    rentAllSelect(event) {
      if (this.selectBol) {
        console.log("全选");
        // this.rentCheckList = event.target.checked ? this.allRentCheckList : [];
        //因为改变组件
        this.rentCheckList = event ? this.allRentCheckList : [];
        for(let i =0;i<this.rentCheckList.length;i++){
          if( this.rentCheckList[i].goods.stock_status != 0){
            this.rentCheckList[i].goods.price = 0;
          }
        }
        // console.log(this.allRentCheckList);
        console.log(this.rentCheckList);
        //计算总价格
        this.rentCountTotalPrice();
      }
    },

    //全选监听
    rentAllSelectHandle(value) {
      // console.log(value.length);
      let checkedCount = value.length;
      this.rentCheckAll = checkedCount === this.rentGoods.length;
      // console.log(this.rentCheckList);
      //计算总价格
      this.rentCountTotalPrice();
    },

    //租赁计算总价格&总数
    rentCountTotalPrice() {
      this.rentTotal = 0.0; //初始化
      this.rentCount = 0;
      this.rentCount = this.rentCheckList.length;
      for(let i =0;i<this.rentCheckList.length;i++){
        if( this.rentCheckList[i].goods.stock_status != 0){
          this.rentCount--;
        }
      }

      for (var i = 0; i < this.rentCheckList.length; i++) {
        this.rentTotal += this.rentCheckList[i].goods.price * this.rentCheckList[i].total;
      }

      this.rentTotal = Number(
        this.rentTotal.toString().match(/^\d+(?:\.\d{0,2})?/)
      );
    },

    //租赁界面操作
    onRentCartDelete() {
      this.rentDelete = !this.rentDelete;
      this.rentCheckList = []; //清空数据源
      this.rentCheckAll = false; //恢复view
      this.allRentCheckList = this.rentGoods; //重置全选数据
      this.rentCountTotalPrice(); //计算价格总数
      if (this.rentGoods.length == 0) {
        this.isShowListRent = false;
      }
    },

    //删除租赁商品
    rentDeleteGoods() {
      if (this.rentCheckList.length == 0) {
        Toast("请选择删除商品");
        console.log("请选择删除商品");
        return;
      }

      //删除网络操作
      let that = this;
      let _ids = [];
      for (var i = 0; i < this.rentCheckList.length; i++) {
        _ids.push(this.rentCheckList[i].id);
      }
      console.log(_ids);
      //let json = { ids: JSON.stringify(_ids) };
      let json = {
        ids: _ids,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };
      $http
        .get("plugin.lease-toy.api.member-cart.destroy", json, "操作中")
        .then(
          function(response) {
            console.log(response);
            if (response.result == 1) {
              that.rentDeleteGoodsView();
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },

    //删除后View操作
    rentDeleteGoodsView() {
      if (this.rentCheckAll) {
        this.rentGoods = []; //清空数据源
        this.rentCheckList = []; //清空数据源
        this.allRentCheckList = []; //全选数据
      } else {
        for (var i = 0; i < this.rentCheckList.length; i++) {
          for (var j = 0; j < this.rentGoods.length; j++) {
            console.log(this.rentGoods[j].id);
            if (this.rentGoods[j].id == this.rentCheckList[i].id) {
              this.rentGoods.splice(j, 1);
              break;
            }
          }
        }
        this.rentCheckList = []; //清空

        console.log(this.rentGoods);
        console.log(this.rentCheckList);
      }

      this.onRentCartDelete(); //操作界面
    },

    //租赁提交订单
    rentSubmitGoods() {
      let rentCartId = [];
      if (this.showChoose && !this.radioChoose) {
        Toast("请先选择配送方式");
        return;
      }
      if(this.showChoose) {
        // 配送方式有冲突
        for (let i = 0; i < this.dispatch_types[this.radioChoose].member_carts.length; i++) {
          rentCartId.push(this.dispatch_types[this.radioChoose].member_carts[i].id);
        }
      }else {
        for (let i = 0; i < this.rentCheckList.length; i++) {
          if( this.rentCheckList[i].goods.stock_status == 0){
            rentCartId.push(this.rentCheckList[i].id);
          }
        }
      }

      this.$router.push(
        this.fun.getUrl("goodsorder",{}, {
          tag: "rentCartBuy",
          cart_ids: rentCartId.join(',')
        })
      );
    },

    //租赁改变数量
    rentChangeNumber(goods, _num) {
      let that = this;
      let json = {
        id: goods.id,
        num: _num,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };

      $http.get("plugin.lease-toy.api.member-cart.updateNum", json, "").then(
        function(response) {
          console.log(response);
          if (response.result == 1) {
            if (_num > 0) {
              that.rentAddNumberView(goods);
            } else {
              that.rentDeleteNumberView(goods);
            }
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },

    //租赁添加处理view
    rentAddNumberView(goods) {
      console.log(this.rentCheckList);
      for (var i = 0; i < this.rentCheckList.length; i++) {
        if (goods.id == this.rentCheckList[i].id) {
          if (this.rentCheckList[i].total > 0) {
            this.rentCheckList[i].total = this.rentCheckList[i].total + 1;
            this.rentCountTotalPrice(); //计算总价格
            return;
          }
        }
      }
      for (var j = 0; j < this.rentGoods.length; j++) {
        if (goods.id == this.rentGoods[j].id) {
          if (this.rentGoods[j].total > 0) {
            this.rentGoods[j].total = this.rentGoods[j].total + 1;
            break;
          }
        }
      }
    },
    //租赁添加
    rentAddNumber(goods) {
      //网络操作后处理
      this.rentChangeNumber(goods, 1);

      console.log(goods);
    },

    //租赁减少View处理
    rentDeleteNumberView(goods) {
      for (var i = 0; i < this.rentCheckList.length; i++) {
        if (goods.id == this.rentCheckList[i].id) {
          if (this.rentCheckList[i].total > 1) {
            this.rentCheckList[i].total = this.rentCheckList[i].total - 1;
            this.rentCountTotalPrice(); //计算总价格
            return;
          }
        }
      }

      for (var j = 0; j < this.rentGoods.length; j++) {
        if (goods.id == this.rentGoods[j].id) {
          if (this.rentGoods[j].total > 1) {
            this.rentGoods[j].total = this.rentGoods[j].total - 1;
            break;
          }
        }
      }
    },

    //租赁减少
    rentDeleteNumber(goods) {
      if (goods.total == 1) {
        return;
      }
      //网络操作后处理
      this.rentChangeNumber(goods, -1);
    },

    //租赁商品跳转至详情
    toRentDetail(goods) {
      this.$router.push(this.fun.getUrl("goods", { id: goods.goods_id }));
    },

    //最近热租
    getHotRent(data) {
      // $http
      //   .get("plugin.lease-toy.api.heat-rent.index", {})
      //   .then(response => {
      //     if (response.result === 1) {
      this.hotRentList = data.hent_rent;
      //   }
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    //热租详情跳转

    gotoHotRentDetail(val) {
      this.$router.push(this.fun.getUrl("goods", { id: val }));
    },

    //购买数量v2
    //改变数量 2
    changeCount(goods, _num, index) {
      console.log(goods);

      if (_num < 0) {
        Toast("商品数量不能为负数");
        // goods.total=1;
        this.goods[index].total = 1;
        return;
      }

      let that = this;
      let json = {
        id: goods,
        num: _num,
        i: this.fun.getKeyByI(),
        type: this.fun.getTyep()
      };

      $http.get("member.member-cart.updateNumV2", json, "").then(
        function(response) {
          console.log(response);

          if (response.result === 1) {
            // if (_num > 0) {
            // 	that.addNumberView(goods);
            // } else {
            // 	that.deleteNumberView(goods);
            // }
            that.changeNumberView(goods, _num);
          } else {
            Toast(response.msg);
            // goods.total=1;
            that.goods[index].total = 1;
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    numberLeft(index) {
      // console.log(this.goods[index].total);
      this.goods[index].total = Number(this.goods[index].total) - 1;
      if (this.goods[index].total <= 0) {
        Toast("商品数量不能为负数或零");
        this.goods[index].total = 1;
        return;
      }
      this.changeCount(this.goods[index].id, this.goods[index].total);
    },
    numberRight(index) {
      // console.log(this.goods[index].total);
      this.goods[index].total = Number(this.goods[index].total) + 1;
      // if (this.goods[index].total >= 51) {
      //   Toast("该商品每周最多可购买50件");
      //   this.goods[index].total = 1;
      //   return;
      // }
      this.changeCount(this.goods[index].id, this.goods[index].total);
    },

    changeNumberView(goods) {
      for (var i = 0; i < this.checkList.length; i++) {
        if (goods == this.checkList[i].id) {
          if (this.checkList[i].total > 0) {
            //this.checkList[i].total = this.checkList[i].total + 1;
            this.countTotalPrice(); //计算总价格
            return;
          }
        }
      }
    }
  },
  components: { cTitle }
};
