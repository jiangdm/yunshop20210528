<template>
  <div id="coupon_store">
    <c-title :hide="false" text="领券中心"></c-title>
    <div style="height: 40px;"></div>
    <div class="banner">
      <!-- <img src="../../assets/images/cupon.png" alt /> -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" loop='true'>
        <van-swipe-item v-for="(item,i) in slide_shows" :key="i">
          <img :src="item.pic_url" alt="" @click="toRouteLink(item.slide_link)">
        </van-swipe-item>
      </van-swipe>

    </div>
    <Sticky>
    <div class="navTabrNew">
      <ul>
        <li
          v-for="(item,index) in types"
          :key="index"
          @click="setTypesIndex(index)"
          :style="{backgroundColor:typesIndex == index?'#4f4f4f':'',color:typesIndex == index?'#ffffff':''}"
        >
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    </Sticky>
    <van-pull-refresh v-model="isLoading" @refresh="loadTop" success-text="刷新成功">
      <ul class="coupon-list" style="padding: 1rem 0; padding-bottom: 10rem;">
        <div v-for="(item,index) in coupon_list" @click="selectedcoupon(item,index)" :key="index">
          <li v-if="item.api_availability==1">
            <div class="shopCoupon">
              <div class="shopCouponNew">
                <div class="left">
                  <div
                    class="postLeft"
                    :style="{backgroundImage:`url(https://www.yunzmall.com/min_img/couponsbg_${item.type}.png)`}"
                    v-if="item.coupon_method==1"
                  >
                      <span class="textOne">{{$i18n.t('money')}}{{item.deduct}}</span>
                      <div class="line"></div>
                      <span class="textTwo">满{{item.enough}}立减</span>
                  </div>
                  <div
                    class="postLeft"
                    :style="{backgroundImage:`url(https://www.yunzmall.com/min_img/couponsbg_${item.type}.png)`}"
                    v-if="item.coupon_method==2"
                  >
                      <span class="textOne">{{item.discount}}折</span>
                      <div class="line"></div>
                      <span class="textTwo">满{{item.enough}}立享</span>
                  </div>
                </div>
                <div class="right">
                  <div class="right_top">
                    <div class="right_top_text">
                      <div :class="`baground_${item.type}`">{{item.coupon_type_name}}</div>
                      <span>{{item.name}}</span>
                    </div>
                    <span>已领人数：{{item.has_many_member_coupon_count}}人</span>
                    <span v-if="item.api_remaining !=-1">可领张数：{{item.api_remaining}}张</span>
                    <span v-if="item.api_remaining ==-1">可领张数：多张</span>
                    <div class="Receive" >
                      <div :class="`baground_${item.type}`">立即领取</div>
                    </div>
                  </div>
                  <div class="right_bottom"></div>
                </div>
              </div>
              <div class="coupon_voucher_btm" :class="{ hies: display == index }">
                <p class="coupon_voucher_explain">{{ item.api_limit | escapeTitle }}</p>
              </div>
            </div>
          </li>
          <!-- 已领取 -->
          <li v-if="item.api_availability==2">
            <div class="shopCoupon">
              <div class="shopCouponNew">
                <div class="left">
                  <div
                    class="postLeft"
                    :style="{backgroundImage:`url(https://www.yunzmall.com/min_img/couponsbg_${item.type}.png)`}"
                  >
                    <template v-if="item.coupon_method==1">
                      <span class="textOne">{{$i18n.t('money')}}{{item.deduct}}</span>
                      <div class="line"></div>
                      <span class="textTwo">满{{item.enough}}立减</span>
                    </template>
                    <template v-else>
                      <span class="textOne">{{item.discount}}折</span>
                      <div class="line"></div>
                      <span class="textTwo">满{{item.enough}}立享</span>
                    </template>
                  </div>
                </div>
                <div class="right">
                  <div class="right_top">
                    <div class="right_top_text">
                      <div :class="`baground_${item.type}`">{{item.coupon_type_name}}</div>
                      <span>{{item.name}}</span>
                    </div>
                    <span>已领人数：{{item.has_many_member_coupon_count}}人</span>
                    <span v-if="item.api_remaining !=-1">可领张数：{{item.api_remaining}}张</span>
                    <span v-if="item.api_remaining ==-1">可领张数：多张</span>
                    <div class="alreadyReceive">
                      <div class="already">
                        <div class="inready">已领取</div>
                      </div>
                    </div>
                  </div>
                  <div class="right_bottom"></div>
                </div>
              </div>
              <div class="coupon_voucher_btm" :class="{ hies: display == index }">
                <p class="coupon_voucher_explain">{{ item.api_limit | escapeTitle }}</p>
              </div>
            </div>
          </li>
          <!-- 已抢光 -->
          <li v-if="item.api_availability==3">
            <div class="shopCoupon">
              <div class="shopCouponNew">
                <div class="left">
                  <div
                    class="postLeft"
                    :style="{backgroundImage:`url(https://www.yunzmall.com/min_img/couponsbg_${item.type}.png)`}"
                  >
                    <template v-if="item.coupon_method==1">
                      <span class="textOne">{{$i18n.t('money')}}{{item.deduct}}</span>
                      <div class="line"></div>
                      <span class="textTwo">满{{item.enough}}立减</span>
                    </template>
                    
                    <template v-if="item.coupon_method==2">
                      <span class="textOne">{{item.discount}}折</span>
                      <div class="line"></div>
                      <span class="textTwo">满{{item.enough}}立享</span>
                    </template>
                  </div>
                </div>
                <div class="right">
                  <div class="right_top">
                    <div class="right_top_text">
                      <div :class="`baground_${item.type}`">{{item.coupon_type_name}}</div>
                      <span>{{item.name}}</span>
                    </div>
                    <span>已领人数：{{item.has_many_member_coupon_count}}人</span>
                    <span v-if="item.api_remaining !=-1">可领张数：{{item.api_remaining}}张</span>
                    <span v-if="item.api_remaining ==-1">可领张数：多张</span>
                    <div class="alreadyReceive">
                      <div class="already">
                        <div class="inready">已抢光</div>
                      </div>
                    </div>
                  </div>
                  <div class="right_bottom"></div>
                </div>
              </div>
              <div class="coupon_voucher_btm" :class="{ hies: display == index }">
                <p class="coupon_voucher_explain">{{ item.api_limit | escapeTitle }}</p>
              </div>
            </div>
          </li>

          <!--可领取
          <li v-if="item.api_availability==1" class="single-coupon js_coupon">
            <div class="single-coupon-l">
              <div class="sc-title">
                <div class="sc-margin">
                  <div v-if="item.coupon_method==1">
                    <p class="sc-money">{{$i18n.t('money')}}{{item.deduct}}</p>
                    <p class="sc-message">满{{item.enough}}立减</p>
                  </div>
                  <div v-else>
                    <p class="sc-money">{{item.discount}}折</p>
                    <p class="sc-message">满{{item.enough}}立享</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-coupon-m">
              <p class="scm-text coupon_lineclamp">{{item.name}}</p>
              <p class="scm-text scm-greytext">
                已领人数：
                <span class="js_peopleCount">{{item.has_many_member_coupon_count}}</span>人
                <br />
                <em v-if="item.api_remaining !=-1">
                  可领张数：
                  <span class="js_peopleCount">{{item.api_remaining}}</span>张
                </em>
                <template v-if="item.api_remaining ==-1">可领张数：多张</template>
              </p>
            </div>
            <div class="receice_in">
              <div class="receTxt">可领取</div>
            </div>
          </li>-->
          <!--已领取
          <li v-if="item.api_availability==2" class="single-coupon js_coupon">
            <div class="single-coupon-l">
              <div class="sc-title">
                <div class="sc-margin">
                  <div v-if="item.coupon_method==1">
                    <p class="sc-money">{{$i18n.t('money')}}{{item.deduct}}</p>
                    <p class="sc-message">满{{item.enough}}立减</p>
                  </div>
                  <div v-else>
                    <p class="sc-money">{{item.discount}}折</p>
                    <p class="sc-message">满{{item.enough}}立享</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-coupon-m coupon_remain">
              <p class="scm-text coupon_lineclamp">{{item.name}}</p>
              <p class="scm-text scm-greytext">
                已领人数：
                <span class="js_peopleCount">{{item.has_many_member_coupon_count}}</span>人
                <br />
                <em v-if="item.api_remaining !=-1">
                  可领张数：
                  <span class="js_peopleCount">{{item.api_remaining}}</span>张
                </em>
                <template v-if="item.api_remaining ==-1">可领张数：多张</template>
              </p>
            </div>
          </li>-->
          <!--已抢光
          <li v-if="item.api_availability==3" class="single-coupon no_coupon">
            <div class="single-coupon-l">
              <div class="sc-title">
                <div class="sc-margin">
                  <div v-if="item.coupon_method==1">
                    <p class="sc-money">{{$i18n.t('money')}}{{item.deduct}}</p>
                    <p class="sc-message">满{{item.enough}}立减</p>
                  </div>
                  <div v-else>
                    <p class="sc-money">{{item.discount}}折</p>
                    <p class="sc-message">满{{item.enough}}立享</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-coupon-m coupon_remain">
              <p class="scm-text coupon_lineclamp">{{item.name}}</p>
              <p class="scm-text scm-greytext">
                已领人数：
                <span class="js_peopleCount">{{item.has_many_member_coupon_count}}</span>人
              </p>
            </div>
          </li>
          -->
        </div>
      </ul>
    </van-pull-refresh>
    <div class="posbtn" @click="toStore">
      <img src="https://www.yunzmall.com/min_img/coupons_mycouponsbg@2x.png" alt="">
      <div>我的优惠券</div>
    </div>
  </div>
</template>
<script>
import coupon_infocontroller from './coupon_storecontroller';

export default coupon_infocontroller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/coupon_index.scss';
@import '../../assets/css/coupon_centen.scss';

.posbtn {
  position: fixed;
  bottom: 5rem;
  right: 50%;
  transform: translateX(10rem);
  // width: 3.78rem;
  img {
    width: 3.78rem;
  }

  div {
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    background: #fb605f;
    padding: 0.2rem 0.3rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.baground_4 {
  background-color: #6dccf8;
}

.baground_6 {
  background-color: #fb946c;
}

.baground_1 {
  background-color: #fbbd5c;
}

.baground_5 {
  background-color: #6dccf8;
}

.baground_3 {
  background-color: #a291ff;
}

.baground_2 {
  background-color: #fc6d6d;
}

.baground_8 {
  background-color: #3c98ff;
}

.navTabrNew {
  box-sizing: border-box;
  outline: none;
  padding: 0.5rem 0 1rem 0;
  background-color: #fff;

  ul {
    overflow-x: scroll;
    white-space: nowrap;
    display: flex;
    text-align: center;
    margin: 0 0.78rem;

    li {
      flex: 1;
      border: 0;
      margin-right: 0.69rem;
      box-sizing: border-box;
      background-color: #eeecec;
      border-radius: 13px;
      padding: 5px 10px;
    }
  }
}

.shopCoupon {
  background-color: #fff;
}

.shopCoupon .left .postLeft {
  right: 0;
}
</style>
