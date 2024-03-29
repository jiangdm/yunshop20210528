
import cTitle from 'components/title';
// import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    selectBol:true,
    currentAddress: String
  },
  data() {
    return {
      lastIndex: -1,
      defaultIndex: 0,
      activeName: 'first',
      checkList: [],
      datasource: []
    };
  },

  methods:
    {
      selectBolfun:function () {
        this.selectBol=true;
      },
      //设置默认地址
      setDefaultAddress(itemIndex) {
        if(this.selectBol){
          console.log(this.checkList);
          console.log(itemIndex);
          // var item = this.datasource[itemIndex];
          // if (this.checkList[itemIndex]) {
          //   return;
          //
          // } else {
          this.postData(this.datasource[itemIndex].id, itemIndex);

          // }
        }

      },
      selectedAddress(index) {
        if (this.checkList[index]) {
          return;

        } else {
          this.postData(this.datasource[index].id, index);

        }
        //this.postData(this.datasource[index].id,index);
      },
      //添加地址
      addendAddress() {
        //this.$router.push('/member/appendAddress');

        this.$router.push(this.fun.getUrl('appendAddress'));

      },
      //删除地址
      deleteHandler(item, itemIndex) {
        this.$dialog.confirm({ message: "确定删除此收货地址?"})
          .then(() => {
            //删除当前选中的地址
            console.log(item);
            var that = this;
            $http.get('member.member-address.destroy', { address_id: item.id }, true).then(function (response) {
              that.datasource.splice(that.datasource.indexOf(item), 1);
              that.checkList.splice(itemIndex, 1);
            }, function (response) {
              that.$dialog.alert({message:response.msg});
              // error callback
              
            });
          }).catch(() => {});
      },
      //修改收货地址
      alterHandler(itemIndex) {

        this.$router.push(this.fun.getUrl('alterAddress', { model: this.datasource[itemIndex] }));

      },
      getAddress() {
        var that = this;
        $http.get('member.member-address.index', {}).then(function (response) {

          if (response.result == 1) {
            for (var i = 0; i < response.data.length; i++) {
              var item = response.data[i];
              if (item.isdefault == 1) {

                that.$set(that.checkList, i, true);

              } else {
                that.$set(that.checkList, i, false);


              }

            }
            that.datasource = response.data;

          } else {
            console.log(response.msg);
          }
        }, function (response) {
          // error callback
        });
      },
      //设置默认地址的
      postData(address_id, index) {
        //member.member-address.setDefault
        var that = this;
        $http.get('member.member-address.setDefault', { address_id: address_id }).then(function (response) {

          if (response.result == 1) {

            that.$dialog.alert({message:response.msg});
            that.datasource[index].isdefault = true;
            that.setDefaultAddressSuccessful(index);
            that.selectBol=false;
          } else {
            that.$dialog.alert({message:response.msg});
           
          }
        }, function (response) {
          // error callback
        });
      },
      setDefaultAddressSuccessful(itemIndex) {
        if (this.lastIndex < 0) {
          //首次进入页面
          this.lastIndex = itemIndex;

          for (let i = 0; i < this.checkList.length; i++) {
            this.$set(this.checkList, i, false);

          }
          this.$set(this.checkList, itemIndex, true);
        } else {

          this.$set(this.checkList, this.lastIndex, false);
          this.$set(this.checkList, itemIndex, true);
          this.lastIndex = itemIndex;

        }

      }

    },
  mounted() {


  },
  created() {


  },
  activated() {
    this.datasource=[];
    this.getAddress();
  }
  ,
  components: { cTitle }
};