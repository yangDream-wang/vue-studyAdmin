<!--
  功能：权限列表(递归)
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-21 09:07:11
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='TreeRoleList'>
    
    <span v-for="(item,index) in data" :key="index">
      <span v-if="'children' in item">
        <el-row>
          <el-col :span="3">
            <el-tag :type="layer < 5 ? tagType[layer]:tagType[Math.floor(layer/5) < 5 ? Math.floor(layer/5):'']" closable class="margin-tb-xs" @close="closeRole(row,item.id)">{{item.authName}}</el-tag>
            <i class="el-icon-right margin-left"></i>
          </el-col>
          <el-col :span="20">
            <tree-role-list :data="item.children" :layer="layer+1" :row="row"></tree-role-list>
          </el-col>
        </el-row>
      </span>
      <span v-else>
        <el-tag :type="layer < 5 ? tagType[layer]:tagType[Math.floor(layer/5) < 5 ? Math.floor(layer/5):'']" closable @close="closeRole(row,item.id)" class="margin-tb-xs margin-right-xs">{{item.authName}}</el-tag>
      </span>
    </span>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  components: {},
  props:{/**接受父组件传值*/ 
  /**要递归的数据 */
    data:{
      type:Array,
      default:()=>[]
    },
    /**数据源 */
    row:{
      type:Object,
      default:()=>{}
    },
    /**当前递归第几层 */
    layer:{
      type:Number,
      default:()=>0
    }
  },
  name:'TreeRoleList',
  data(){
    return{
      tagType:['','success','warning','danger'],
    }
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ 
  },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/

  },
  methods: {/**所有方法*/
    async closeRole(row,rightId){
      const res = await this.$request.roles.deleteRight({id:row.id,rightId:rightId})
      const {data,meta:{status,msg}} = res.data
      if(status == 200 ){ row.children = data }else{ this.$message.error(msg) }
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

</style>