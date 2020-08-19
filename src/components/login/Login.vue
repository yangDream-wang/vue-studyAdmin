<!--
  功能：login
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-14 12:01:17
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='Login width-height-100 flex-center'>
    <div class="bg-white shadow padding-right-lg flex flex-direction radius" style="min-width:400px;max-width:40%;">
      <div class="width-100 flex justify-end">
        <h2 class="margin-tb-lg" style="width:82%;">用户登录</h2>
      </div>
      <el-form label-position="right" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="submitForm">提交</el-button>
          <el-button @click.prevent="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  components: {},
  props:{/**接受父组件传值*/ },
  name:'Login',
  data() {
    return {
      formLabelAlign:{ username:'admin', password:123456 }
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/

  },
  methods: {/**所有方法*/
    async submitForm(){
      const that=this;
      const res = await this.$request.login.login(this.formLabelAlign)
      const {data,meta:{msg,status}} = res.data
      if(status == 200){
        try{
          sessionStorage.setItem('token',data.token)
          // localStorage.setItem('token',data.token)
          this.$message({message: msg,duration:1500,type: 'success',onClose(){
            that.$router.replace('/')
          }})
        }catch(e){
          this.$message.error(e);
        }
        return
      }
      this.$message.error(msg);
    },
    resetForm(){},
  },
  mounted() {/**加载完组件时执行(加载完成之后执行)*/ },
  beforeCreate() {/**生命周期 - 创建之前*/},
  beforeMount() {/**生命周期 - 挂载之前*/},
  beforeUpdate() {/**生命周期 - 更新之前*/},
  updated() {/**生命周期 - 更新之后*/},
  beforeDestroy() {/**生命周期 - 销毁之前*/},
  destroyed() {/**生命周期 - 销毁完成*/},
  activated() {/**keep-alive组件激活时调用。仅针对keep-alive组件有效*/ },
  deactivated() {/**keep-alive组件停用时调用。仅针对keep-alive组件有效*/ },
}
</script>
<style scoped>
  .Login{
    background: url('../../assets/images/common/youname.jpg') rgba(0, 0, 0, .5);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: multiply;
  }
  .shadow{
    box-shadow: 0 4px 12px rgba(255, 255, 255, .5)
  }
</style>