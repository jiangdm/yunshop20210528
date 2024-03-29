import cTitle from 'components/title';
import { Swipe, SwipeItem } from 'c-swipe';
//require('c-swipe/dist/swipe.css');
// import { Toast } from 'vant';
export default {

  data() {
    return {
      startTime:'请选择出发日期',
      dateshow_1:false,
      minDate: new Date(),
      language: {},
      selected: "1",
      popupSpecs: false,//城市pop
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      allCitys: [],
      sokey: '',//搜索的关键词
      dataModel: '',//选择的时间
      selectData: "",//当前选择的时间
      cityTag: "",//选择城市的 方向 出发 到达
    };
  },

  components: { cTitle, Swipe, SwipeItem },
  methods: {


    //选择城市
    selectCity(tag) {
      this.cityTag = tag;//标记赋值
      this.popCityOpen();
    },

    //关闭城市pop
    popCityClose() {
      this.popupSpecs = false;
    },

    //开启城市pop
    popCityOpen() {
      this.popupSpecs = true;
      var trainCity = localStorage.getItem("trainCity");
      if (this.fun.isTextEmpty(trainCity)) {
        this.getCityInfo();//获取地址json数据
      } else {
        this.initCityInfo();
      }
    },


    //获取火车票城市
    getCityInfo() {
      let that = this;
      $http.get('plugin.train.api.goods.trainStation', {}, '').then(function (response) {
        if (response.result == 1) {
          var trainCity = JSON.stringify(response.data);
          localStorage.setItem("trainCity", trainCity);
          //初始化数据
          that.initCityInfo();
        } else {
          that.popCityClose();
          that.$dialog.alert({message:response.msg});
				
        }
      }, function (response) {
        that.popCityClose();
        that.$dialog.alert({message:response.msg});
			
      });
    },

    //初始化城市信息
    initCityInfo() {
      var trainCity = localStorage.getItem("trainCity");
      var trainCitys = [];
      trainCitys = JSON.parse(trainCity);
      this.allCitys = trainCitys;
    },


    //选择城市
    chooseCity(e, city) {
      if (this.cityTag == "from") {
        this.language.readonly = city.name;
      } else if (this.cityTag == "to") {
        this.language.readonlyto = city.name;
      }
      this.popCityClose();
    },

    //城市对调
    cityChanges() {
      let temp = this.language.readonly;
      this.language.readonly = this.language.readonlyto;
      this.language.readonlyto = temp;
    },

    //右面点机处理
    goSoso(e) {
      console.log(e);
      e = e.toLowerCase();
      this.sokey = e;
    },

    //选择时间
    dataOnChange(val) {
      this.selectData = val;
      console.log(this.selectData);
    },

    //初始化语言
    initLang() {
      if (sessionStorage.languageService) {
        this.language = JSON.parse(sessionStorage.languageService).trainTicket;
      } else {
        this.language = this.$store.state.service.languageService.trainTicket;
      }
    },

    //提交
    submit() {
      if (this.fun.isTextEmpty(this.language.readonly) || this.language.readonly == "请选择") {
        this.$dialog.alert({message:'请选择出发的城市'});
        return;
      }

      if (this.fun.isTextEmpty(this.language.readonlyto) || this.language.readonlyto == "请选择") {
        this.$dialog.alert({message:'请选择到达的城市'});
			
        return;
      }

      if (this.fun.isTextEmpty(this.selectData)) {
        this.$dialog.alert({message:'请选择出发日期'});
			
        return;
      }

      let that = this;
      let json = { date: this.selectData, fromStation: this.language.readonly, toStation: this.language.readonlyto };
      $http.get('plugin.train.api.goods.trainLinesForASC', json, '查询中').then((response) => {
        if (response.result == 1) {
          let dataInfo = {};
          dataInfo.data = response.data;
          dataInfo.json = json;
          localStorage.setItem('trainTicket', JSON.stringify(dataInfo));

          //跳转火车列表
          //that.$router.push(that.fun.getUrl('trainSearchResults', { para: JSON.stringify(json) }));
          that.$router.push(that.fun.getUrl('trainSearchResults', {}));

        } else {
          that.$dialog.alert({message:response.msg});
				
        }
      }, function (response) {
        that.$dialog.alert({message:response.msg});
			
      });

    },
    seleStartTime:function () {
      this.dateshow_1=true;
    },
    //时间戳转日期
    format:function (shijianchuo){
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      return y+'-'+m+'-'+d;
    },
    confirmbtn:function (val) {
      this.dateshow_1=false;

      var time = new Date(val).getTime();
      var timeData=this.format(time);
      this.selectData=timeData;
      this.dataModel=timeData;
      this.startTime=timeData;
      console.log( this.selectData);
    },
    cancelbtn:function () {
      this.dateshow_1=false;
    },
  },



  //实时监测this.$store.state.service.chinese的变化，获取最新的语言包
  computed: {
    getLangState() {
      return this.$store.state.service.languageService;
    },

    searchData: function () {
      var search = this.sokey;
      let searchs = [];
      if (search) {
        for (let i = 0; i < this.allCitys.length; i++) {
          let a = (String(search)).toUpperCase();
          if (this.allCitys[i].key == a) {
            console.log(searchs.push(this.allCitys[i]));
            return searchs;
          }
        }
      }
      return this.allCitys;
    }
  },
  watch: {
    getLangState(val) {
      if (val) {
        this.language = JSON.parse(sessionStorage.languageService).trainTicket;
      } else {
        this.language = this.$store.state.service.languageService.trainTicket;
      }
    }
  },

  mounted() {
    this.initLang();
  },

  activated() {
    this.popupSpecs = false;
    this.$store.commit('onload');
  },
  destroyed() {

  }

};
