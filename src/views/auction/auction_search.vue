<template>
  <div id="auction_search">
    <c-title :hide="false" text="搜索结果"></c-title>
    <div class="content">
          <div class="wrap" >
              <div class="select">
                  <div class="select-option">
                    <span>{{status==1?'拍品':'拍卖官'}}</span>
                    <i class="iconfont icon-down" @click="show=true"></i>
                  </div>
                  <div class="option" v-if="show">
                    <div class="option-one" @click="select(1)">
                      拍品
                    </div>
                    <div class="option-two" @click="select(2)">
                        拍卖官
                      </div>
                  </div>
                </div>
                <div class="input">
                    <i class="iconfont icon-sousuo" @click="getSearch"></i>
                  <input type="text" :placeholder="status==1?'搜索拍卖商品':'搜索拍卖官'" v-model="keyword"  @keypress="enterSearch">
                </div>
          </div>
          <div class="good-list" v-if="status==1" >
              <div class="good" v-for="(item,index) in datas" :key="index" @click="toDetail(item)">
                <div class="image">
                    <img :src="item.thumb">
                </div>
                <div class="bottom">
                  <div class="tit">{{item.title}}</div>
                  <div class="cash">
                      <span>起拍价</span>
                      <div class="money"><span style="font-size: 12px;">{{$i18n.t('money')}}</span><span>{{item.start_price?item.start_price
                        :0}}</span></div>
                  </div>
                </div>
                <div class="time">
                  {{timestampToTime(item.end_shooting)}}结束
              </div>
              </div>
            </div>
            <div class="shop-item"  v-if="status==2" >
                <div class="item" v-for="(item,index) in datas" :key="index" @click="toShop(item)">
                  <div class="avator">
                    <img :src="item.avatar">
                  </div>
                  <div class="name">{{item.nick_name}}</div>
                  <div>浏览：{{item.browse_num}}次</div>
                </div>
              </div>
    </div>
  </div>
</template>

<script>
import auction_search_controller from "./auction_search_controller";

export default auction_search_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#auction_search {
  padding-top: 40px;
  background-color: #fff;
  height: 100vh;

  .content {
    padding: 0 0.75rem;
    background-color: #fff;

    .wrap {
      display: flex;
      align-items: center;

      .select {
        margin-right: 1rem;
        position: relative;
        width: 5rem;

        .option {
          position: absolute;
          width: 4rem;
          border: solid 1px #ccc;
          box-shadow: 0 0 0.4375rem 0 rgba(194, 194, 194, 0.31);
          background-color: #fff;
          z-index: 999;

          .option-one {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: solid 1px #ccc;
            height: 2rem;
          }

          .option-two {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
          }
        }
      }

      .input {
        width: 16.8125rem;
        height: 1.875rem;
        background-color: #f8f8f8;
        border-radius: 0.9375rem;
        margin: 0 auto;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;

        i {
          color: #c9c9c9;
          margin-right: 0.75rem;
          margin-left: 0.75rem;
        }

        input {
          outline: none;
          border: none;
          color: #c9c9c9;
          font-size: 12px;
        }
      }
    }

    .good-list {
      flex-wrap: wrap;
      margin-top: 1.25rem;
      display: flex;

      .good {
        width: 48%;
        margin-right: 4%;
        box-shadow: 0 0 0.4375rem 0 rgba(194, 194, 194, 0.31);
        border-radius: 0.3125rem;
        position: relative;
        margin-bottom: 1.25rem;

        .image {
          width: 100%;
          height: 10.625rem;

          img {
            width: 100%;
            height: 100%;
            border-top-left-radius: 0.3125rem;
            border-top-right-radius: 0.3125rem;
          }
        }

        .bottom {
          padding: 0 0.5rem;
          padding-top: 0.5rem;
          padding-bottom: 1rem;

          .tit {
            color: #333;
            text-align: left;
          }

          .cash {
            text-align: left;
            font-size: 12px;
            display: flex;
            margin-top: 1.125rem;

            .money {
              font-size: 16px;
              color: #ef3e3e;
            }
          }
        }

        .time {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          width: 5.4375rem;
          background-image:
            linear-gradient(
              270deg,
              #ff6333 0%,
              #ff2c29 100%
            ),
            linear-gradient(
              #fe8a02,
              #fe8a02
            );
          border-radius: 0.3125rem 0 0.3125rem;
          box-sizing: border-box;
          color: #fff;
          font-size: 12px;
        }
      }

      .good:nth-child(2n) {
        margin-right: 0;
      }
    }

    .shop-item {
      display: flex;
      flex-wrap: wrap;

      .item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 2%;
        width: 32%;
        padding: 1rem 0;
        background-color: #fff;
        flex-direction: column;
        border-radius: 1.3125rem;
        text-align: left;
        box-shadow: 0 0 0.4375rem 0 rgba(194, 194, 194, 0.31);
        margin-bottom: 1rem;

        .avator {
          width: 3.0625rem;
          height: 3.0625rem;
          box-sizing: border-box;
          border-radius: 50%;
          margin-bottom: 0.75rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .name {
          margin-bottom: 0.75rem;
        }

        .count {
          color: #999;
          font-size: 12px;
        }

        .mask {
          border-radius: 1.3125rem;
          background-color: rgba(140, 140, 140, 0.5);
          display: flex;
          align-items: center;
          position: absolute;
          width: 100%;
          height: 100%;
          justify-content: center;

          .lock {
            width: 2.8125rem;
            height: 2.8125rem;
            background-color: rgba(255, 255, 255, 0.4);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 50%;

            i {
              font-size: 28px;
            }
          }
        }
      }

      .item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
