<template >
  <div id="quick_index">
    <c-title :hide="false"
             text='汇聚支付'></c-title>
    <div id="content">
      <div class="header">
        <div class="user">
          <div class="user-head">
            <img :src="member.avatar_image">
          </div>
          <ul class="activities-name">
            <li>{{member.nickname}}</li>
          </ul>
        </div>
      </div>
      <div class="cart">
        <div class="list1"
             @click="toShaky"
             v-if="quick_pay=='1'"
             >
          <i class="iconfont icon-pay_huijupay"
                   style="margin-right: 0.375rem; font-size: 1.625rem; color: #f15353;"></i>
          <span>快捷支付</span>
          <i class="fa fa-angle-right"></i>
        </div>
        <div class="list1"
             @click="gotoLove"
             v-if="payment_status=='1'"
             >
          <i class="iconfont icon-pay_producttixian"
                   style="margin-right: 0.375rem; font-size: 1.625rem; color: #f15353;"></i>
          <span>提现产品</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import quick_index_controller from "./quick_index_controller";
export default quick_index_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#quick_index {
  padding-top: 40px;

  #content {
    .header {
      height: auto;
      background: #f15353;
      background-size: 100% 100%;
      padding: 1.25rem;
      position: relative;

      .user {
        display: flex;
        text-align: center;
        align-items: center;

        .activities-name {
          text-align: left;
          flex: 2;
          margin-left: 0.625rem;
          line-height: 1.875rem;
          color: #fff;
          font-weight: bold;
          font-size: 18px;

          .user-info {
            color: #fff;
          }

          .user-info .user-name {
            width: auto;
            font-size: 14px;

            .b-activities {
              color: #fff;
            }
          }
        }

        .user-head {
          height: 4rem;
          width: 4rem;
          background: #fff;
          border-radius: 50%;
          border: 0.125rem solid #fff;
          box-sizing: border-box;
          float: left;
          overflow: hidden;
        }

        .user-head img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .user-gold {
        height: 2.1875rem;
        width: 94%;
        padding: 0.3125rem 3%;
        border-bottom: 0.0625rem solid #f5f3f3;
        background: #fff;
        font-size: 12px;
        line-height: 2.1875rem;
      }

      .user-gold .title {
        height: 2.1875rem;
        width: auto;
        float: left;
        color: #666;
      }

      .user-gold .num {
        height: 2.1875rem;
        width: auto;
        float: left;
        color: #f90;
      }

      .user-gold .draw {
        width: 5rem;
        height: 1.875rem;
        background: #6c9;
        float: right;
      }

      .user-op {
        height: 2.1875rem;
        width: 94%;
        padding: 0.3125rem 3%;
        border-bottom: 0.0625rem solid #f5f3f3;
        background: #fff;
        font-size: 12px;
        line-height: 2.1875rem;
      }
    }

    #userinfo {
      background: #fff;
      margin-bottom: 0.625rem;

      ul {
        padding: 1rem 0;

        li a {
          color: #8c8c8c;
          text-align: center;
          display: block;
        }

        li a span {
          color: #222;
          font-size: 14px;
        }

        li:first-child {
          border-right: solid 0.0625rem #ebebeb;
        }

        li {
          flex: 1;
          float: left;
          width: 50%;
          box-sizing: border-box;
          border: 0;

          span {
            color: #f15353;
            font-size: 18px;
            display: inline-block;
            margin-bottom: 0.375rem;
            font-weight: bold;
          }

          small {
            font-weight: normal;
            font-size: 12px;
          }
        }

        li:last-child {
          border: 0;
        }

        li a {
          color: #8c8c8c;
          text-align: center;
          display: block;
        }

        li a span {
          color: #222;
          font-size: 16px;
          margin-bottom: 0.3125rem;
          display: inline-block;
        }

        li a {
          color: #8c8c8c;
          font-size: 12px;
        }

        li::after {
          content: "";
          display: block;
          clear: both;
        }
      }

      ul::after {
        content: "";
        display: block;
        clear: both;
      }
    }

    .cart {
      height: auto;
      width: 100%;
      background: #fff;

      .list1 {
        height: 2.75rem;
        background: #fff;
        padding-right: 0.875rem;
        margin-left: 0.875rem;
        border-top: 0.0625rem solid #ebebeb;
        font-size: 16px;
        line-height: 2.75rem;
        color: #333;
        text-align: left;
        display: flex;

        .fa-angle-right {
          float: right;
          line-height: 2.75rem;
          display: inline-block;
          font-size: 1.5rem;
          color: #c9c9c9;
          text-align: center;
          background-size: 1.25rem;
          position: absolute;
          right: 0.875rem;
        }
      }
    }
  }
}
</style>
