import cTitle from 'components/title';
export default {
  data() {
    return {
      cup_name:"",
      cup_id:"",
      cup_img:""
    };
  },

  activated() {

    this.cup_name=this.$route.params.name;
    
    this.cup_id=this.$route.params.id;

    this.cup_img=window.localStorage.getItem("cupImg");
  },

  mounted() {

    

  },
  methods: {
   
    //清空
    empty(){
      this.$dialog.confirm({ message: "确认清空此商品"})
        .then(() => {
          $http.get("plugin.cabinet.Frontend.Modules.Lattice.Controllers.take-goods.index",{mark:this.$route.params.mark},"操作中...").then(response =>{
            if(response.result == 1){
              console.log(response);
              this.$dialog.alert({message:response.msg});
              this.$router.go(-1);
            }
          }).catch(error =>{
            console.log(error);
            this.$dialog.alert({message:response.msg});
    
            this.$router.go(-1);
          });
        }).catch(() => {});
    }
  },
  components: {cTitle}
};