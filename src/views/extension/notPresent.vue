<template>
  <div id="commission">
    <c-title :hide="false"
             :text='`未${this.fun.initWithdrawal()}佣金`'></c-title>
    <div style="height: 40px;"></div>

    <div v-for="(item,i) in datas" :key='i'>

      <div class="tbs">
        <ul class="item1">
          <li>{{item.order_sn}}</li>
          <li>{{item.price}}{{$i18n.t('元')}}</li>
        </ul>
        <div class="item2">
          <li class="reg">佣金 +{{item.commission}}</li>
          <li>{{item.created_at}}</li>
        </div>
      </div>

    </div>

    <!--<div class="times">2017年3月</div>
			<router-link :to="{ name: 'notPresentDetails', params: { id: 12 }}">
				<div class="tbs">
					<div class="item1">商品名字
						<br/>984.15元</div>
					<div class="item2"><span class="reg">佣金   +3.00</span>
						<br />2013.09.05 09:51:05</div>
				</div>
			</router-link>-->

  </div>
</template>
<script>
import notPresent_controller from "./notPresent_controller";
export default notPresent_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commission {
  .times {
    text-align: left;
    text-indent: 0.625rem;
    line-height: 2rem;
    background: #ddd;
  }

  .tbs {
    background: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0.625rem 0.75rem;
    border-bottom: 0.0625rem solid #e2e2e2;
    font-size: 14px;

    li {
      line-height: 1.5rem;
    }

    .item1 {
      color: #000;
      flex: 50%;
      text-align: left;
    }

    .item2 {
      flex: 50%;
      text-align: right;
      color: #8c8c8c;

      .reg {
        color: #259b24;
      }
    }
  }
}
</style>
