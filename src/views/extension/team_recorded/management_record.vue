<template>
  <div id="management_record">
    <c-title :hide="false" :text="record_title"></c-title>
    <div id="content">
      <div class="info_box">
        <div class="info">
          <ul>
            <li>{{ rewardsData.today }}</li>
            <li>今日</li>
          </ul>
          <ul>
            <li>{{ rewardsData.yesterday }}</li>
            <li>昨日</li>
          </ul>
          <ul>
            <li>{{ rewardsData.this_week }}</li>
            <li>本周</li>
          </ul>
          <ul>
            <li>{{ rewardsData.this_month }}</li>
            <li>本月累计分红</li>
          </ul>
        </div>
        <div class="img">
          <img src="../../../assets/images/sale_img.png" />
        </div>
      </div>
      <div class="award_box">
        <van-tabs v-model="activeName" @click="handleClick">
          <van-tab name="-1" title="全部"></van-tab>
          <van-tab name="1" title="已发放"></van-tab>
          <van-tab name="0" title="未发放"></van-tab>
          <van-tab name="2" title="已失效"></van-tab>
        </van-tabs>
        <div>
        <!-- <mt-tab-container v-model="activeName" :swipeable="true"> -->
          <div v-show="activeName==-1">
          <!-- <mt-tab-container-item id="-1"> -->
            <div class="list_box" v-if="activeName === '-1'">
              <ul v-for="(item, index) in recordsList" :key="index">
                <li>
                  <span v-if="type !== 'TeamPerformance'">
                    {{ item.source_member.nickname }}
                  </span>
                  <span v-if="type === 'TeamPerformance'">
                    {{ item.member.nickname }}
                  </span>
                  <span>{{ item.amount }}</span>
                </li>
                <li>
                  <span>{{ item.created_at }}</span>
                  <span>{{ item.status_name }}</span>
                </li>
              </ul>
            </div>
          <!-- </mt-tab-container-item> -->
          </div>
          <div v-show="activeName==1">
          <!-- <mt-tab-container-item id="1"> -->
            <div class="list_box" v-if="activeName === '1'">
              <ul v-for="(item, index) in recordsList" :key="index">
                <li>
                  <span v-if="type !== 'TeamPerformance'">
                    {{ item.source_member.nickname }}
                  </span>
                  <span v-if="type === 'TeamPerformance'">
                    {{ item.member.nickname }}
                  </span>
                  <span>{{ item.amount }}</span>
                </li>
                <li>
                  <span>{{ item.created_at }}</span>
                  <span>{{ item.status_name }}</span>
                </li>
              </ul>
            </div>
          <!-- </mt-tab-container-item> -->
          </div>
          <div v-show="activeName==0">
          <!-- <mt-tab-container-item id="0"> -->
            <div class="list_box" v-if="activeName === '0'">
              <ul v-for="(item, index) in recordsList" :key="index">
                <li>
                  <span v-if="type !== 'TeamPerformance'">
                    {{ item.source_member.nickname }}
                  </span>
                  <span v-if="type === 'TeamPerformance'">
                    {{ item.member.nickname }}
                  </span>
                  <span>{{ item.amount }}</span>
                </li>
                <li>
                  <span>{{ item.created_at }}</span>
                  <span>{{ item.status_name }}</span>
                </li>
              </ul>
            </div>
          <!-- </mt-tab-container-item> -->
          </div>
          <div v-show="activeName==2">
          <!-- <mt-tab-container-item id="2"> -->
            <div class="list_box" v-if="activeName === '2'">
              <ul v-for="(item, index) in recordsList" :key="index">
                <li>
                  <span v-if="type !== 'TeamPerformance'">
                    {{ item.source_member.nickname }}
                  </span>
                  <span v-if="type === 'TeamPerformance'">
                    {{ item.member.nickname }}
                  </span>
                  <span>{{ item.amount }}</span>
                </li>
                <li>
                  <span>{{ item.created_at }}</span>
                  <span>{{ item.status_name }}</span>
                </li>
              </ul>
            </div>
          <!-- </mt-tab-container-item> -->
          </div>
        <!-- </mt-tab-container> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import management_record_controller from "./management_record_controller.js";

export default management_record_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#management_record {
  padding-top: 40px;

  #content {
    .info_box {
      position: relative;

      .info {
        background-color: #fff;
        padding: 0.75rem 0;
        display: flex;

        ul:first-child,
        ul:nth-child(2),
        ul:nth-child(3) {
          width: 5.125rem;

          li {
            line-height: 1.875rem;
          }

          li:first-child {
            font-size: 20px;
            color: #ffa800;
          }

          li:last-child {
            font-size: 13px;
            font-weight: bold;
          }
        }

        ul:last-child {
          width: 8.0625rem;

          li {
            line-height: 1.875rem;
          }

          li:first-child {
            font-size: 20px;
            color: #ffa800;
          }

          li:last-child {
            font-size: 13px;
            font-weight: bold;
          }
        }
      }

      .img {
        position: absolute;
        bottom: 0.625rem;
        right: 7.625rem;
        height: 3.75rem;

        img {
          height: 100%;
        }
      }
    }

    .award_box {
      margin-top: 0.625rem;

      .list_box {
        margin-top: 0.375rem;
        background-color: #fff;

        ul {
          padding: 0.625rem 0.875rem;
          border-bottom: solid 0.0625rem #ebebeb;

          li:first-child {
            display: flex;
            justify-content: space-between;
            line-height: 1.875rem;
            font-size: 16px;

            span:last-child {
              color: #f15353;
            }
          }

          li:last-child {
            display: flex;
            justify-content: space-between;
            line-height: 1.5rem;
            font-size: 16px;

            span:first-child {
              font-size: 14px;
              color: #8c8c8c;
            }
          }
        }
      }
    }
  }
}
</style>
