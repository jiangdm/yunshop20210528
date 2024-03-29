import cTitle from "components/title";

export default {
  components: { cTitle },
  data() {
    return {
      language: {},

      //明细
      details: false
    };
  },
  methods: {
    //初始化语言
    initLang() {
      if (sessionStorage.languageService) {
        this.language = JSON.parse(sessionStorage.languageService).ticketOrderDetail;
      } else {
        this.language = this.$store.state.service.languageService.ticketOrderDetail;
      }
    },
    //我要改签
    changeSign() {
      this.$dialog.confirm({
        title: this.language.pleaseCall,
        message: "12345678",
        confirmButtonText: this.language.confirm,
        cancelButtonText: this.language.cancle
      })
        .then(() => {

        }).catch(() => {
        });
    },
    //查看明细
    closeDetails() {
      this.details = !this.details;
    }
  },
  //实时监测this.$store.state.service.chinese的变化，获取最新的语言包
  computed: {
    getLangState() {
      return this.$store.state.service.languageService;
    }
  },
  watch: {
    getLangState(val) {
      if (val) {
        this.language = JSON.parse(sessionStorage.languageService).ticketOrderDetail;
      } else {
        this.language = this.$store.state.service.languageService.ticketOrderDetail;
      }
    }
  },

  mounted() {
    this.initLang();
  },

  activated() {
    this.$store.commit("onload");
  }
};