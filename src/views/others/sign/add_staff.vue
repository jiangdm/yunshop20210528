<template>
  <div class="form">
    <c-title :hide="false" :text="'添加员工'">
    </c-title>
    <div style="height: 40px;"></div>
    <div class="content">
      <van-form>
        <van-field
          v-model="form.name"
          name="员工姓名"
          label="员工姓名"
          placeholder="请填写员工姓名"
          :rules="[{ required: true, message: '请填写员工姓名' }]"
        />
        <van-field
          v-model="form.tel"
          name="员工手机号"
          label="员工手机号"
          placeholder="请填写员工手机号"
          :rules="[{ required: true, message: '请填写员工手机号' }]"
        />
        <van-field
          label-width="120"
          v-model="mobile"
          name="法定代表人手机号"
          label="法定代表人手机号"
          placeholder="请填写法定代表人手机号"
          :rules="[{ required: true, message: '请填写法定代表人手机号' }]"
        />
        <van-field
          v-model="form.sms_code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" round plain type="info" @click="sendCode" v-show="this.count<= 0">
            获取验证码
          </van-button>
          <van-button slot="button" size="small" round plain type="info" disabled v-show="this.count> 0">
            {{count}}秒后重新获取
          </van-button>
        </van-field>
      </van-form>
      <p class="warning" v-if="showWarning">
        <span class="red">该用户未完成个人实名认证，为了保证合同签署的合法有效，请通知该用户先完成个人实名认证。</span><span class="link" v-clipboard:copy="href"  v-clipboard:success="onCopy"  v-clipboard:error="onError" >点击复制实名认证链接</span>
      </p>
    </div>
    <div class="btn" @click="sureAdd">保存</div>


    <div class="fixed-box" v-if="showBox">
      <router-link class="fixed-item" :to="fun.getUrl('home')">
        <i class="iconfont icon-zhuye2" style="font-size: 28px;"></i>
        <span>首页</span>
      </router-link>
      <router-link class="fixed-item" :to="fun.getUrl('signIndex')">
        <i class="iconfont icon-yq_hetongzhongxin" style="padding: 4px;"></i>
        <span>合同中心</span>
      </router-link>
      <div class="triangle"></div>
    </div>
    <div class="fixed-img" @click="showBox = !showBox">
      <img src="../../../assets/images/sign/yht_exprot@2x.png" alt="">
    </div>
  </div>
</template>

<script>
import cTitle from "components/title";
import { Toast } from 'vant';

export default {
  data() {
    return {
      showBox: false,
      form : {
        tel: "",
        name: "",
        sms_code: ""
      },
      mobile: "",
      count: "",
      timer: null,
      showWarning: false,
      href: ''
    };
  },
  activated() {
    this.showBox = false;
    this.mobile = localStorage.getItem("siteMobile");
    this.showWarning = false;
    this.href = this.fun.getSiteRoot() + "/addons/yun_shop/" + "?menu#" + "/personBank?i=" + this.fun.getKeyByI() + "&type=" + this.fun.getTyep() + "&mid=" + this.fun.getKeyByMid();
  },
  methods: {
    onCopy: function(e) {
      Toast("复制成功");
    },
    onError: function(e) {
      Toast("复制失败");
    },
    sureAdd() {
      if (!this.form.sms_code) {
        Toast("请输入验证码");
        return;
      }
      $http
        .get("plugin.yun-sign.frontend.h5.worker.add-worker", this.form)
        .then(response => {
          if (response.result === 1) {
            this.form = {
              tel: "",
              name: "",
              sms_code: ""
            };
            this.$dialog.alert({message:response.msg});
            this.$router.push(this.fun.getUrl("staffManagement"));
          } else {
            this.$dialog.alert({message:response.msg});
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    sendCode() {
      if(!this.form.tel) {
        Toast('请先输入员工手机号');
        return;
      }
      if(!this.form.name) {
        Toast('请先输入员工姓名');
        return;
      }
      $http.post("plugin.yun-sign.frontend.h5.worker.add-worker-sms", {tel: this.form.tel, name: this.form.name}, "loading").then(response => {
        if (response.result === 1) {
          if(response.data.auth_status == 1){
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          }else {
            this.showWarning = true;
          }

        } else {
          if (response.msg) {
            this.$dialog.alert({message:response.msg});
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
  },
  components: { cTitle }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .form {
    background: #fff;
    height: 100vh;
  }

  .content {
    font-weight: bold;
  }

  .warning {
    padding: 1rem;
    text-align: left;

    .red {
      color: #ff3c3c;
    }

    .link {
      color: #5c92ff;
    }
  }

  .btn {
    margin: 40px auto 20px auto;
    color: #fff;
    width: 18.75rem;
    height: 2.25rem;
    line-height: 2.25rem;
    background-image: linear-gradient(0deg, #377aff 0%, #679aff 100%);
    border-radius: 20px;
  }

  .fixed-img {
    position: fixed;
    bottom: 8rem;
    right: 2%;

    img {
      width: 3rem;
      height: 3rem;
    }
  }

  .fixed-box {
    background: #fff;
    position: fixed;
    bottom: 12rem;
    right: 2%;
    color: #518bff;
    width: 4rem;
    border-radius: 5px;
    padding: 2px;
    box-shadow: 0 0.25rem 0.5625rem 0.0625rem rgba(0, 0, 0, 0.06);

    .triangle {
      position: fixed;
      bottom: 11.1rem;
      right: 8%;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #fff;
    }

    .fixed-item {
      display: flex;
      flex-direction: column;

      i {
        font-size: 21px;
      }
    }
  }
</style>
