<template>
  <div id="yz_location">
    <van-popup v-model="showLocation" round position="bottom" :style="{ height: '80%' }" :close-on-click-overlay="false">
      <!--container-->
      <div id="map" style="width: 100%; height: 100%; overflow: hidden; display: flex; flex-direction: column;">
        <div class="m-t-10" style="width: 100%; height: 3rem;">
          <a class="mint-cell mint-field">
            <div class="mint-cell-wrapper">
              <div style="background: #fff; box-shadow: none; margin-top: 0; padding-right: 0.5rem;" @click="goback">
                <i class="iconfont icon-back"></i>
              </div>
              <div class="search_box" style="font-size: 14px;">
                <i class="iconfont icon-sousuo1"></i>
                <input type="text" v-model="address_detail" id="suggestId" name="address_detail" placeholder="输入您所在的地点" />
              </div>
            </div>
          </a>
        </div>

        <div class="loading" v-if="showLoading">定位中，可直接输入...</div>

        <div v-show="fromHome !== 1" id="container" style="width: 100%; height: 40%;"></div>
        <div v-show="fromHome !== 1" id="panel" style="width: 100%; height: 53%; flex: 1;"></div>
      </div>
    </van-popup>
    <!--container end-->
  </div>
</template>

<script>
import AMap from "AMap";
import { Toast } from "vant";

var mapListText = [];
//  var geolocation, markers, marker
var map, placeSearch, self, placeSearchOptions, listCount, marker;
var num = [];
var poisArrCopy = [];
var numIndex = 0;

export default {
  model: {
    prop: "showLocation",
    event: "onEmit"
  },
  props: {
    //弹窗是否显示，默认不显示
    showLocation: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    address_detail: null, // 详细地址
    listCount: listCount,
    listText: mapListText,
    center: { lng: 0, lat: 0 },
    num: num,
    fromHome: 0,
    showLoading: false
  }),
  created() {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
  },
  mounted() {
    console.log(this.$route);
    self = this;
    // this.ready();
  },
  // activated() {

  // },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    showLocation: function(newV, oldV) {
      if (newV) {
        this.$nextTick(() => {
          this.ready();
          this.initFun();
        });
      }
    }
  },
  methods: {
    initFun() {
      this.address_detail = "";
      var myLocation = this.$store.state.o2oLocation;
      this.showLoading = true;
      if (myLocation.point) {
        //myLocation = JSON.parse(myLocation);

        this.address = myLocation.title;
        this.city = myLocation.city;
        this.point = myLocation.point;

        let _self = this;
        let promise = new Promise(function(resolve, reject) {
          _self.init(_self.point);
          resolve();
        });
        promise
          .then(function() {
            _self.searchData(_self.point, _self.callback);
            _self.demo();
          })
          .then(function() {});
      } else {
        console.log("location不存在");
        this.getLocation();
      }
    },
    init: function(p) {
      map = new AMap.Map("container", {
        center: [p.lng, p.lat],
        resizeEnable: false,
        zoom: 5
      });
      var icon = new AMap.Icon({
        image: "http://vdata.amap.com/icons/b18/1/2.png",
        size: new AMap.Size(24, 24)
      });
      marker = new AMap.Marker({
        icon: icon,
        position: [p.lng, p.lat],
        offset: new AMap.Pixel(-13, -30)
      });
      map.add(marker);
      AMap.plugin(["AMap.Geolocation", "AMap.PlaceSearch", "AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
      });
    },
    searchData: function(p, callback) {
      // …………………………………………………………方法选项…………………………………………………………………………………………………………
      placeSearchOptions = {
        // 构造地点查询类
        panel: "panel", // 结果列表将在此容器中进行展示。
        pageSize: 20, // 单页显示结果条数
        pageIndex: 1, // 页码
        //city: '020', // 兴趣点城市 默认全国
        map: map, // 展现结果的地图实例
        // citylimit: true,  //是否强制限制在设置的城市内搜索
        //autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        visible: false
      };

      AMap.service("AMap.PlaceSearch", function() {
        // map.clearMap()  // 清除地图覆盖物
        placeSearch = new AMap.PlaceSearch(placeSearchOptions);
        placeSearch.searchNearBy("", [p.lng, p.lat], 1000, function(status, result) {
          self.showLoading = false;
          // self.$dialog.loading.close();
        });
        AMap.event.addListener(placeSearch, "listElementClick", listElementClick); // 返回定位信息

        function listElementClick(e) {
          // console.log('e:', e);

          AMap.plugin("AMap.Geocoder", function() {
            var geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: self.city
            });

            //var lnglat = [116.396574, 39.992706]
            geocoder.getAddress(e.data.location, function(status, result) {
              console.log(result);
              if (status === "complete" && result.info === "OK") {
                // result为对应的地理位置详细信息
                let point = {
                  lat: e.data.location.lat,
                  lng: e.data.location.lng
                };
                console.log("write9999999", result);
                let pos = {};
                if (result.regeocode.addressComponent.city == "") {
                  pos = {
                    address: e.data.address,
                    // city:result.regeocode.addressComponent.district,
                    city: result.regeocode.addressComponent.province,
                    province: result.regeocode.addressComponent.province,
                    title: e.data.name,
                    point: point
                  };
                } else {
                  pos = {
                    address: e.data.address,
                    city: result.regeocode.addressComponent.city,
                    province: result.regeocode.addressComponent.province,
                    title: e.data.name,
                    point: point
                  };
                }
                self.$store.commit("updateLocation", pos);
                self.$store.commit("setLocation", pos);

                self.$emit("onEmit", false);
                self.$emit("confirm", pos);
              }
            });
          });
        }
      });
      return callback;
    },
    callback: function(status, result) {
      var promise = new Promise(function(resolve, reject) {
        let _result = result;
        const pois = _result.poiList.pois;
        poisArrCopy = pois.copyWithin(0);
        self.num.push(poisArrCopy);
        //          self.listText = pois
        //          self.listCount = _result.poiList.count
        //          placeSearch.M.pageSize = 10
        resolve();
      });
      promise.then(function() {
        console.log("Resolved.");
        return self.demo();
      });
    },
    demo: function() {
      numIndex++;
      if (numIndex > 4) {
        if (self.num.length > 0) {
          return map.clearMap(); // 清除地图覆盖物
        }
      }
    },
    goback() {
      this.$emit("onEmit", false);
    },
    ready: function() {
      var th = this;
      var that = this;
      //输入提示
      var auto = new AMap.Autocomplete({
        input: "suggestId",
        city: that.city
      });
      AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
      function select(e) {
        console.log("e:", e);

        AMap.plugin("AMap.Geocoder", function() {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: that.city
          });
          //var lnglat = [116.396574, 39.992706]
          geocoder.getAddress(e.poi.location, function(status, result) {
            console.log(result);
            if (status === "complete" && result.info === "OK") {
              // result为对应的地理位置详细信息
              var point = {
                lat: e.poi.location.lat,
                lng: e.poi.location.lng
              };
              var pos = {};
              console.log("write9999999", result);
              if (result.regeocode.addressComponent.city == "") {
                pos = {
                  address: e.poi.address,
                  // city:result.regeocode.addressComponent.district,
                  city: result.regeocode.addressComponent.province,
                  province: result.regeocode.addressComponent.province,
                  title: e.poi.name,
                  point: point
                };
              } else {
                pos = {
                  address: e.poi.address,
                  city: result.regeocode.addressComponent.city,
                  province: result.regeocode.addressComponent.province,
                  title: e.poi.name,
                  point: point
                };
              }

              console.log("look55555555", pos, result);

              th.$store.commit("updateLocation", pos);
              th.$store.commit("setLocation", pos);

              th.$emit("onEmit", false);
              th.$emit("confirm", pos);
            } else {
              Toast("请输入更详细的地址");
            }
          });
        });
      }
    },
    //获取当前的经纬度
    getLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
      });

      function onComplete(obj) {
        // var res =
        //   "经纬度：" +
        //   obj.position +
        //   "\n精度范围：" +
        //   obj.accuracy +
        //   "米\n定位结果的来源：" +
        //   obj.location_type +
        //   "\n状态信息：" +
        //   obj.info +
        //   "\n地址：" +
        //   obj.formattedAddress +
        //   "\n地址信息：" +
        //   JSON.stringify(obj.addressComponent, null, 4);
        // alert(res);
        //alert(JSON.stringify(obj.addressComponent, null, 4));
        var position = obj.position.toString().split(",");
        that.point = {
          lat: position[1],
          lng: position[0]
        };
        that.address = obj.formattedAddress;
        that.title = obj.formattedAddress;
        that.city = !that.fun.isTextEmpty(obj.addressComponent.city) ? obj.addressComponent.city : obj.addressComponent.province;

        // marker.setMap(map);

        var pos = {
          address: obj.formattedAddress,
          city: that.city,
          title: obj.formattedAddress,
          point: that.point
        };

        that.$store.commit("updateLocation", pos);
        that.$store.commit("setLocation", pos);
        window.localStorage.setItem("myLocation", JSON.stringify(pos));

        let promise = new Promise(function(resolve, reject) {
          that.init(that.point);
          resolve();
        });
        promise
          .then(function() {
            that.searchData(that.point, that.callback);
            that.demo();
          })
          .then(function() {});
      }

      function onError(obj) {
        console.log(obj);
        that.fromHome = 1;
        Toast("定位失败，请手动输入地址");
      }
    }
  }
};
</script>

<style>
.amap-sug-result {
  z-index: 2020;
}

#map {
  /* position: absolute; */
  padding: 0;
  width: 100%;
  background: #fff;
}

#container {
  width: 100%;
  height: 100%;
  font-size: 15px;
}

#panel {
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
  border-bottom: solid 1px silver;
}

#map .search_box {
  display: flex;
  justify-content: flex-start;
  padding: 0 0.625rem;
  width: 19.5rem;
  height: 1.875rem;
  line-height: 1.875rem;
  border-radius: 1rem;
  background-color: #f5f5f5;
}

.loading {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  background-color: rgba(40, 40, 40, 0.85);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  z-index: 99999 !important;
}

.search_box input {
  border: none;
  margin-left: 0.625rem;
  max-width: 19.5rem;
}

.search_box i {
  color: #999;
  font-size: 1rem;
}

.m-t-10 {
  display: flex;
  align-items: center;
}

.mint-cell-wrapper {
  display: flex;
  align-items: center;
}
</style>
