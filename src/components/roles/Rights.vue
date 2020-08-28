<!--
  功能：权限列表
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-16 15:49:53
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='Rights height-100'>
    <div class="width-100">
      <div class="width-100 flex justify-between">
        <div class="flex padding-bottom-sm">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button size="mini" plain icon="el-icon-refresh" @click="refresh"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出当前数据" placement="top">
            <el-button size="mini" plain icon="el-icon-printer" @click="exportExcel"></el-button>
          </el-tooltip>
        </div>
      </div>
      <!-- 
      ref:获取table对象
      data:数据源
      highlight-current-row:高亮当前行
      stripe:显示斑马纹
      border:显示边框(可以拖动列宽)
      @selection-change:多选改变事件
      @cell-click="fastEdit":点击某一个单元格事件
      -->
      <el-table id="table" ref="table" height="83vh" :data="table.dataList" highlight-current-row stripe border @cell-click="fastEdit">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" sortable label="ID" width="100"/>
        <el-table-column prop="authName" label="名称"/>
        <el-table-column prop="path" label="路径"/>
        <el-table-column prop="level" label="级别">
          <template slot-scope="{row}">
            <span v-if="row.level == '0'">一级</span>
            <span v-if="row.level == '1'">二级</span>
            <span v-if="row.level == '2'">三级</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import ExportExcel from 'plugins/exportExcel'
export default {
  components: {},
  props:{/**接受父组件传值*/ },
  name:'Rights',
  data() {
    return {
      table:{
        /**搜索 */
        keyword:'',
        /**表格数据源 */
        dataList:[],
        pagination:{
          /**当前页码 */
          currentPage:1,
          /**显示每页多少条 */
          handleSize:10,
          /**共有多少条 */
          total:0
        },
        /**多选 */
        multipleSelection: [],
        /**多选删除确认弹窗 */
        selectionVisible:false,
        /**表格删除确认框 */
        itemVisible:false,
        /**显示添加和编辑弹窗 */
        addEdit:{
          /**控制显示隐藏Dialog */
          addEditDialogVisible:false,
          /**控制是否全屏Dialog */
          fullScreen:false,
          /**添加时没有id,编辑时有id */
          form:{},
        },
        
      },
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    this.getRights({type:'list'})
  },
  methods: {/**所有方法*/
    /**权限列表*/
    async getRights(currentPage,handleSize,keyword=''){
      const res = await this.$request.roles.getRights({type:'list'})
      const {data,meta:{status}} = res.data
      if(status == 200){
        this.table.dataList = data
      }
    },
    /**刷新 */
    async refresh(){
      try{
        this.getRights({type:'list'})
        this.$notify.success({ title: '刷新成功', message: '最新数据已到达' });
      }catch(e){
        this.$notify.error({ title: '刷新失败', message: e });
      }
    },
    /**导出Excel表格*/
    exportExcel() {
      ExportExcel.exportExcel('#table')
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
  .cursor{ cursor:pointer }
</style>