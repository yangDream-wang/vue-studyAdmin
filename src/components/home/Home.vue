<!--
  功能：首页
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-14 16:44:15
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='Home width-height-100' style="min-width:1300px;">
    <el-container class="container width-height-100">
      <el-header class="header">
        <div class="width-height-100 flex">
          <div class="width-10 flex-center border-cyan">暂无图片</div>
          <div class="width-80 flex-center">这是后台管理系统</div>
          <div class="width-10 flex-center"><el-link type="primary" @click="outLogin">退出</el-link></div>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu unique-opened router>
            <el-submenu index="user">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="role">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航二</span>
              </template>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                <span slot="title">选项一</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                <span slot="title">选项二</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main width-90">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  components: {},
  props:{/**接受父组件传值*/ },
  name:'Home',
  data() {
    return {

    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
      this.getToken()
  },
  methods: {/**所有方法*/
    outLogin(){
      if(sessionStorage.getItem('token')){
        sessionStorage.removeItem('token')
        this.getToken()
      }
    },
    getToken(){
      const token = sessionStorage.getItem('token')
      if(!token){
        this.$router.replace('/login')
      }
    },
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

  .header{
    background-color: #B3C0D1;
  }
  .aside {
    background-color: #D3DCE6;
  }

</style>