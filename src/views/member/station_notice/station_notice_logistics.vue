<template>

	<div class="page">
		
		<z-title title="物流"></z-title>

		<div class="items">

			<div class="item" v-for="(item) in listData" :key="item._id" @click="goPages(item.url)">
				<p class="time">{{item.created_at}}</p>
				<div class="wrapper">

					<div class="head">
						<div class="face">
							<img :src="item.platform_img" alt="">
						</div>
						<p class="name">{{item.title}}</p>
						<div class="label">{{item.platform}}</div>
					</div>
					<p class="c1 ca">{{item.desc}}</p>
					<div class="anchor" v-if="item.msg_body && item.msg_body.length!=0">
						<div class="face">
							<img :src="item.msg_body.img" alt="">
						</div>
						<div class="desc">
							<p class="name">{{item.msg_body.title}}</p>
							<p class="tips" v-if="item.msg_body.desc">{{item.msg_body.desc}}</p>
							<p class="tips" v-else>点击查看</p>
						</div>
					</div>

				</div>
			</div>

		</div>
	
	
	</div>
</template>

<script>

import stationNoticeLogisticsController from './station_notice_logistics_controller.js';

export default stationNoticeLogisticsController;

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .page {
    background: rgb(250, 250, 250);
    min-height: 100vh;
    padding-bottom: 3.0625rem;
    text-align: left;
  }

  .items {
    padding: 0 0.781rem;

    .item {
      .time {
        height: 2.75rem;
        line-height: 2.75rem;
        letter-spacing: 0.019rem;
        color: #666;
        font-size: 0.75rem;
        text-align: center;
      }

      .wrapper {
        background-color: #fff;
        border-radius: 0.25rem;
        width: 100%;
        padding: 0.844rem 0.875rem 0 0.969rem;

        .head {
          display: flex;
          align-items: center;

          .face {
            width: 1.5rem;
            height: 1.5rem;
            background-color: #eee;

            img {
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 50%;
            }
          }

          .name {
            margin-left: 0.438rem;
            font-size: 0.875rem;
            color: #000;
            letter-spacing: 0.022rem;
          }

          .label {
            margin-left: 0.594rem;
            padding: 0.088rem 0.469rem 0.129rem 0.375rem;
            letter-spacing: 0.019rem;
            color: #fff;
            background-color: #43d9b0;
            border-radius: 0.563rem;
            font-size: 0.75rem;
          }
        }

        .c1 {
          margin-top: 0.519rem;
        }

        .ca {
          font-size: 0.75rem;
          line-height: 1.25rem;
          letter-spacing: 0.019rem;
          color: #666;
        }

        .anchor {
          display: flex;
          height: 6.531rem;
          padding: 1rem 0 1.531rem 0;

          .face {
            width: 4rem;
            height: 4rem;
            background-color: #eee;

            img {
              width: 4rem;
              height: 4rem;
            }
          }

          .desc {
            height: 4rem;
            padding-left: 0.531rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
              letter-spacing: 0.019rem;
              color: #000;
              font-size: 0.75rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .tips {
              letter-spacing: 0.019rem;
              font-size: 0.75rem;
              color: #f42a2a;
            }
          }
        }
      }
    }
  }
</style>