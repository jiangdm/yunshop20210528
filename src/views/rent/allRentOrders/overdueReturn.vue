<template>
  <div id="overdueReturn">
    <c-title :hide="false" text='订单详情'></c-title>
    <div style="height: 40px;"></div>

    <div class="m-header">
      <router-link :to="fun.getUrl('transferRecord')">
        <div class="money">转赠记录</div>
      </router-link>
      <h3>逾期未归还 </h3>
      <p><i class="iconfont icon-tishi"></i>您已逾期{{returned.day}}天{{returned.time}}未归还租物，请尽快归还！</p>
      <div class="btn">
        <button type="button" @click="checkDetail()">查看详情</button>
        <button type="button" @click="retu()">归还</button>
      </div>
      <!--归还弹出-->
      <van-popup
        v-model="zhong" position="bottom" closeOnClickModal='true'>
        <div class="alertDeposit">
          <div class="title"><span class="lf" @click="retu()">取消</span>转赠<span class="rt">确定</span></div>
          <div class="maleall">
            <label for="male" class="males">
              <span>所在省份 </span>
              <!--<el-select placeholder="请选择快递公司" >-->
              <!--</el-select>-->
              <van-button
                style="border-radius: 5px; color: #1f2d3d; border: 1px solid #bfcbd9; min-height: 1rem; min-width: 14rem;"
                plain type="primary" @click="seleRegional">{{regional}}
              </van-button>
            </label>
          </div>
          <div class="maleall">
            <label for="male" class="males">
              <span>所在省份 </span>
              <input class="input" type="text" placeholder="请输入快递单号"/>
            </label>
          </div>
          <div class="addr">
            <p>收货人：{{returned.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{returned.tel}}</p>
            <p>归还地址：{{returned.addr}}</p>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="returnAddr">
      <div class="return addr">
        <div class="lf"><span>还</span></div>
        <div class="rt">
          <p>收货人：{{returned.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{returned.tel}}</p>
          <p>归还地址：{{returned.addr}}</p>
        </div>
      </div>
      <div class="recive addr">
        <div class="lf"><span>收</span></div>
        <div class="rt">
          <p>收货人：{{returned.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{returned.tel}}</p>
          <p>归还地址：{{returned.addr}}</p>
        </div>
      </div>
      <div class="remark"><i class="iconfont icon-jiage"></i>备注：请于五月二号上午送达，下午无人在公司</div>
    </div>
    <div class="content">
      <div class="data">
        <div class="lf">
          <i class="iconfont icon-quyufenhong"></i>
          租赁日期
        </div>
        <div class="rt">
          <p>起始：{{returned.startTim}}</p>
          <p>归还：{{returned.endTim}}</p>
          <h3>共计：{{returned.day}}天</h3>
        </div>
      </div>
      <div class="pro">
        <img src="" alt=""/>
        <div class="title">
          <p>{{returned.name}}</p>
          <b>颜色：{{returned.color}}</b>
        </div>
        <div class="rt">
          <p class="rent">租金：{{$i18n.t("money")}}{{returned.send}}/天</p>
          <p>押金：{{$i18n.t("money")}}{{returned.rental}}</p>
          <p>x{{returned.num}}</p>
        </div>
      </div>
      <div class="money">
        <p><span class="lf">租金 <i @click="rentalTip()">?</i></span> <span class="rt">{{$i18n.t("money")}}{{returned.rental}}</span>
        </p>
        <p><span class="lf">押金 <b>(冻结)</b><i @click="depositTip()">?</i></span> <span class="rt">{{$i18n.t("money")}}{{returned.deposit}}</span>
        </p>
        <p><span class="lf">运费 </span> <span class="rt">{{$i18n.t("money")}}{{returned.send}}</span></p>
        <div class="all">
          合计：<span>{{$i18n.t("money")}}{{returned.send}}</span>
        </div>
      </div>
    </div>
    <div class="overdueDescription">
      <div class="title">
        <span class="lf">逾期扣费说明<i @click="overdue()">?</i></span>
        <i class="iconfont icon-right rt" @click="extendOverdu($event)"></i>
        <span class="rt">累计：<b>-{{$i18n.t("money")}}3000.00</b></span>
      </div>
      <table class="extendBox" style="display: none;">
        <tr v-for="(item,i) in overdueDes" :key='i'>
          <td>{{item.time}}</td>
          <td>{{item.everyRent}}</td>
          <td>{{item.deductions}}</td>
          <td>{{item.exerRent}}</td>
        </tr>
      </table>
    </div>

    <ul class="orderDetail">
      <li><span class="lf">订单编号：</span> <span class="rt">14143213123123131</span></li>
      <li><span class="lf">支付方式：</span> <span class="rt">微信支付</span></li>
      <li><span class="lf">下单时间：</span> <span class="rt">{{returned.startTim}}</span></li>
      <li><span class="lf">付款时间：</span> <span class="rt">{{returned.startTim}}</span></li>
    </ul>

    <!-- 租金弹窗 -->
    <div class="modal" v-show="rental">
      <div class="modal-dialog">
        <div class="close" @click="closeModal()">
          <img src="../../../assets/images/close.png">
        </div>
        <h1 class="title">租金说明</h1>
        <p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
      </div>
    </div>
    <!-- 押金弹窗 -->
    <div class="modal" v-show="deposit">
      <div class="modal-dialog">
        <div class="close" @click="closeModal()">
          <img src="../../../assets/images/close.png">
        </div>
        <h1 class="title">押金冻结说明</h1>
        <p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
      </div>
    </div>
    <!-- 逾期扣费弹窗 -->
    <div class="modal" v-show="overdues">
      <div class="modal-dialog">
        <div class="close" @click="closeModal()">
          <img src="../../../assets/images/close.png">
        </div>
        <h1 class="title">逾期扣费说明</h1>
        <p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
      </div>
    </div>
    <van-popup v-model="dateshow_1" position="bottom" :overlay="true">
      <van-picker :columns="columns" @change="onChange" @cancel="onCancelbtn" @confirm="onConfirmbtn" show-toolbar/>
    </van-popup>
  </div>
</template>

<script>
import overdueReturn_controller from "./overdueReturn_controller";

export default overdueReturn_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .alertDeposit .males {
    line-height: 3.125rem;
    display: flex;
    margin-left: 0.625rem;
    padding-right: 0.625rem;
    border-top: 0;

    .address {
      display: inline-block;
      position: relative;
      width: 100%;
      float: right;
      box-sizing: border-box;
      padding-top: 0.5rem;
    }
  }

  .alertDeposit .input {
    width: 100%;
    height: 2.0625rem;
    border-radius: 0.3125rem;
    border: 0.0625rem solid #ccc;
    outline: 0;
    padding-left: 0.375rem;
    margin-top: 0.4375rem;
  }

  .maleall span {
    color: #333;
    font-size: 14px;
    vertical-align: middle;
    width: 6.5625rem;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    line-height: 3.125rem;
  }

  #overdueReturn .alertDeposit .addr {
    height: 4.375rem;
    margin-top: 1.875rem;
    padding-top: 1.25rem;
    border-top: 0.0625rem solid #ccc;
    text-align: left;
    padding-left: 2.1875rem;
    color: rgb(51, 51, 51);
  }

  #overdueReturn {
    .m-header {
      text-align: center;
      padding: 0 0.9375rem;
      background: #fff;
      clear: both;

      .mint-popup-bottom {
        width: 100%;

        .alertRental,
        .alertDeposit {
          font-size: 14px;

          .title {
            height: 2.0625rem;
            line-height: 2.0625rem;
            background: #eee;
            padding: 0 0.9375rem;

            span.rt {
              color: #f15353;
            }

            span.lf {
              color: #8c7d8b;
            }
          }

          .information {
            text-align: left;
            color: #e51c23;
            padding: 0 0.9375rem;
            line-height: 1.875rem;
          }
        }
      }

      .money {
        text-align: right;
        float: right;
        height: 2.5rem;
        line-height: 2.5rem;
        color: #e51c23;
      }

      h3 {
        line-height: 1.875rem;
        padding-top: 1.25rem;
        text-align: center;
        padding-left: 2.5rem;
        color: #ff9500;
        font-weight: normal;
      }

      p {
        clear: both;
        line-height: 1.875rem;

        i {
          padding-right: 0.625rem;
        }
      }

      .btn {
        padding: 0.625rem 0;

        button {
          width: 5rem;
          height: 1.875rem;
          border-radius: 0.3125rem;
          border: 0.0625rem solid #ccc;
          outline: 0;
          background: #fff;
        }

        button:last-child {
          border: 0.0625rem solid #f15353;
          color: #f15353;
        }
      }
    }

    .returnAddr {
      margin-top: 0.625rem;

      .addr {
        display: flex;
        flex-flow: row;
        height: 4.375rem;
        background: #fff;
        border-bottom: 0.0625rem solid #ccc;

        div.lf {
          width: 3.125rem;

          span {
            width: 1.875rem;
            height: 1.875rem;
            display: inline-block;
            text-align: center;
            line-height: 1.875rem;
            border-radius: 50%;
            color: #fff;
            margin-top: 1.25rem;
          }
        }

        div.rt {
          flex: 1;
          padding: 0.9375rem;

          p {
            text-align: left;
            line-height: 1.25rem;
          }
        }
      }

      .return {
        div.lf {
          span {
            background: #ff9500;
          }
        }

        div.rt {
          color: #ff9500;
        }
      }

      .recive {
        div.lf {
          span {
            background: #666;
          }
        }

        div.rt {
          color: #101010;
        }
      }

      .remark {
        line-height: 1.25rem;
        background: #fff;
        padding: 0.625rem 0.9375rem;
        text-align: left;

        i {
          padding-right: 0.5rem;
        }
      }
    }

    .content {
      background: #fff;
      margin-top: 0.625rem;

      .data {
        height: 3.75rem;
        padding: 0.625rem 0.9375rem;

        div.lf {
          line-height: 3.75rem;
        }

        div.rt {
          text-align: right;

          h3 {
            color: #e51c23;
            font-weight: normal;
            font-size: 14px;
            padding-top: 0.25rem;
          }
        }
      }

      .pro {
        background: #e3e3e3;
        margin-top: 0.625rem;
        padding: 0.625rem 0.9375rem;
        overflow: hidden;

        img {
          float: left;
          width: 4.375rem;
          height: 4.375rem;
          background: #fff;
        }

        .title {
          float: left;
          padding-left: 0.3125rem;
          text-align: left;

          p {
            padding-bottom: 0.1875rem;
          }

          b {
            color: #555;
            font-size: 12px;
            font-weight: normal;
          }
        }

        div.rt {
          text-align: right;

          .rent {
            color: #e51c23;
          }
        }
      }

      .money {
        overflow: hidden;
        padding-top: 0.625rem;

        p {
          line-height: 1.5625rem;
          height: 1.5625rem;
          padding: 0 0.9375rem;

          span.lf {
            b {
              color: #e51c23;
              font-weight: normal;
            }

            i {
              width: 1.0625rem;
              height: 1.0625rem;
              display: inline-block;
              background: #e51c23;
              border-radius: 50%;
              line-height: 1.0625rem;
              text-align: center;
              color: #fff;
              margin-left: 0.3125rem;
              font-style: normal;
            }
          }
        }

        p:nth-child(3) {
          padding-bottom: 0.625rem;
        }

        .all {
          border-top: 0.0625rem solid #ccc;
          padding: 0.625rem 0.9375rem;
          text-align: right;
          height: 2.0625rem;
          line-height: 2.0625rem;

          span {
            color: #e51c23;
            font-size: 16px;
          }
        }
      }
    }

    .overdueDescription {
      margin-top: 0.625rem;
      background: #fff;

      .title {
        height: 3.125rem;
        line-height: 3.125rem;
        padding: 0 0.9375rem;

        i.rt {
          font-size: 30px;
        }

        span.lf {
          i {
            width: 1.0625rem;
            height: 1.0625rem;
            display: inline-block;
            background: #e51c23;
            border-radius: 50%;
            line-height: 1.0625rem;
            text-align: center;
            color: #fff;
            margin-left: 0.3125rem;
            font-style: normal;
          }
        }

        span.rt {
          padding-right: 0.625rem;

          b {
            color: #e51c23;
            font-weight: normal;
          }
        }
      }

      .extendBox {
        tr {
          td {
            width: 25%;
            border-top: 0.0625rem solid #ccc;
            padding: 0.625rem 0.1875rem !important;
            color: #aaa;
          }
        }
      }
    }

    .orderDetail {
      padding: 0.625rem 0.9375rem;
      background: #fff;
      margin-top: 0.625rem;

      li {
        height: 1.875rem;
        line-height: 1.875rem;
      }
    }

    /* 弹窗样式 */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 999;

      .modal-dialog {
        width: 80%;
        height: 11.875rem;
        background: #fff;
        border-radius: 0.375rem;
        border-top: 0.625rem solid #f15353;
        margin: 50% auto;
        position: relative;

        .close {
          position: absolute;
          top: -3.125rem;
          right: 0;
        }

        .title {
          color: #666;
          font-size: 14px;
          font-weight: bold;
          line-height: 2.1875rem;
          text-align: left;
          padding-left: 1.5625rem;
          padding-top: 0.625rem;
        }

        p {
          padding: 0 0.9375rem;
          text-align: left;
        }
      }
    }
  }
</style>
