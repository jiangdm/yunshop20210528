<template>
  <section id="page">
    <c-title :hide="false"
             :text="`${this.fun.initWithdrawal()}`"></c-title>
    <!-- 优化 -->
    <div class="content">
      <ul class="transfer_info">
        <li class="info_a">
          <span>可{{this.fun.initWithdrawal()}}：</span>
          <span>{{ val }}元</span>
        </li>
      </ul>
      <button type="button"
              class="btn custom_color"
              @click="submit">
        确认转账
      </button>
    </div>
  </section>
</template>

<script>
import put_forward_coin_controller from "./put_forward_coin_controller.js";
export default put_forward_coin_controller;
</script>

<style lang="scss" rel="stylesheet/scss">
#page {
  padding-top: 50px;

  .content {
    .transfer_info {
      background: #fff;
      padding-left: 0.875rem;
      font-size: 16px;

      .info_a,
      .info_b {
        line-height: 2.875rem;
        border-bottom: solid 0.0625rem #ebebeb;
        display: flex;
        justify-content: flex-start;

        span:first-child {
          width: 6.875rem;
          display: block;
          text-align: left;
        }

        input {
          border: none;
          width: 15.625rem;
        }
      }
    }

    .transfer_sum {
      background: #fff;
      padding: 0.625rem 0.875rem;

      span {
        display: block;
        font-size: 16px;
        line-height: 2.5rem;
        text-align: left;
      }

      .sum {
        text-align: left;
        font-size: 24px;

        input {
          margin-left: 0.375rem;
          line-height: 3.75rem;
          width: 90%;
          font-size: 36px;
          border: none;
        }
      }
    }

    .personal_info {
      margin-top: 0.625rem;
      background: #fff;
      padding-left: 0.875rem;

      li {
        line-height: 2.875rem;
        display: flex;
        font-size: 16px;
        border-bottom: solid 0.0625rem #ebebeb;
        text-align: left;

        span:first-child {
          display: block;
          width: 6.875rem;
        }
      }

      li:last-child {
        border: none;
      }
    }

    .btn {
      width: 21.5625rem;
      margin: 1.25rem auto;
      height: 2.875rem;
      border-radius: 0.25rem;
      font-size: 16px;
      color: #fff;
      background: #f15353;
      border: none;
    }
  }
}
</style>
