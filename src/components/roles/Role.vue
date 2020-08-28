<!--
  功能：列表
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
  <div class='Role height-100'>
    <div class="width-100">
      <div class="width-100 flex justify-between">
        <div class="flex padding-bottom-sm">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button size="mini" plain icon="el-icon-refresh" @click="refresh"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出当前数据" placement="top">
            <el-button size="mini" plain icon="el-icon-printer" @click="exportExcel"></el-button>
          </el-tooltip>
          <el-popconfirm confirmButtonText='删除' cancelButtonText='再想想' icon="el-icon-info" iconColor="red" title="确定删除选中数据吗？" @onConfirm="selectionDelete">
            <el-button slot="reference" size="mini" plain type="info" :disabled="table.multipleSelection.length == 0" style="padding:10px;margin-left:10px;margin-right:10px;">删除</el-button>
          </el-popconfirm>
          <el-button size="mini" plain type="danger" icon="el-icon-plus" @click.stop="showHideForm('','',1)">新增</el-button>
        </div>
        <div class="flex-center" style="min-width:300px;">
          <el-input placeholder="请输入搜索内容" v-model="table.keyword" clearable size="small" ></el-input>
          <div class="padding-xs"/><el-button type="primary" round size="mini" @click="search">搜索</el-button>
        </div>
      </div>
      <!-- 
      ref:获取table对象
      data:数据源
      highlight-current-row:高亮当前行
      stripe:显示斑马纹
      border:显示边框(可以拖动列宽)
      @selection-change:多选改变事件
      -->
      <el-table id="table" ref="table" height="80vh" :data="table.dataList" highlight-current-row stripe border @selection-change="selectionChange" >
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <span v-if="row.children.length != 0">
              <tree-role-list :data="row.children" :row="row"></tree-role-list>
            </span>
            <span v-if="row.children.length == 0">未分配权限</span>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" sortable label="ID" width="100"/>
        <el-table-column prop="roleName" label="角色名称"/>
        <el-table-column prop="roleDesc" label="角色描述"/>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="{row,$index}">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="showHideForm(row,$index,0)" style="margin-right:10px;"></el-button>
            <el-popconfirm confirmButtonText='删除' cancelButtonText='再想想' icon="el-icon-info" iconColor="red" title="确定删除吗？" @onConfirm="del(row,$index)">
              <el-button slot="reference" type="danger" icon="el-icon-delete" circle plain></el-button>
            </el-popconfirm>
            <el-button type="success" icon="el-icon-check" circle plain style="margin-left:10px;" @click="showHideDrawerFn(row,$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="width-100 padding-xl flex justify-end">
        <el-pagination 
          layout="total, sizes, prev, pager, next, jumper" 
          :current-page="table.pagination.currentPage" 
          :page-sizes="[10, 20, 30, 40, 50, 100]" 
          :page-size="table.pagination.handleSize" 
          :total="table.pagination.total"
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <el-dialog :visible.sync="table.addEdit.addEditDialogVisible" center :fullscreen="table.addEdit.fullScreen" :show-close="false" v-dialogDrag>
      <span slot="title">
        <div class="text-xs width-100 flex-center position-rel">
          <p>{{table.addEdit.form.hasOwnProperty('id') ? '编辑':'新增'}}</p>
          <div class="flex align-center justify-around width-10 position-abs text-xs" style="right:0;max-width:100px;">
            <i v-if="!table.addEdit.fullScreen" class="el-icon-full-screen cursor" @click.stop="table.addEdit.fullScreen = table.addEdit.fullScreen ? false:true"></i>
            <i v-if="table.addEdit.fullScreen" class="el-icon-minus cursor" @click.stop="table.addEdit.fullScreen = table.addEdit.fullScreen ? false:true"></i>
            <i class="el-icon-close cursor" @click.stop="showHideForm('','',0)"></i>
          </div>
        </div>
      </span>
      <el-form label-position="right" label-width="auto" :model="table.addEdit.form">
        <div class="flex">
          <el-form-item label="姓名">
            <el-input v-model="table.addEdit.form.username" :disabled="table.addEdit.form.hasOwnProperty('id')"></el-input>
          </el-form-item>
          <el-form-item label="密码" v-if="!table.addEdit.form.hasOwnProperty('id')">
            <el-input type="password" v-model="table.addEdit.form.password"></el-input>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="手机号">
            <el-input v-model="table.addEdit.form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="table.addEdit.form.email"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span v-if="table.addEdit.form.hasOwnProperty('id')">
          <el-button @click.stop="showHideForm('','',0)">取 消</el-button>
          <el-button type="primary" @click="edit">更改</el-button>
        </span>
        <span v-else>
          <el-button @click.stop="showHideForm('','',1)">取 消</el-button>
          <el-button type="primary" @click="addUsers">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-drawer ref="drawer" title="分配权限" :before-close="closeDrawer" :visible.sync="table.roleDrawer.showHideDrawer" direction="rtl">
      <div class="width-100" style="height:94vh;overflow-y:auto;">
        <div class="width-100">
          <el-tree ref="roleTree" :data="table.roleDrawer.dataList" show-checkbox node-key="id" default-expand-all :default-checked-keys="table.roleDrawer.checkedKeys" :props="table.roleDrawer.defaultProps"></el-tree>
        </div>
        <div class="flex width-100 position-sticky-bottom justify-center">
          <el-button @click="$refs.drawer.closeDrawer()">取 消</el-button>
          <el-button type="primary" @click="selectRole">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import TreeRoleList from '../tree/TreeRoleList'
import ExportExcel from 'plugins/exportExcel'
export default {
  components: {TreeRoleList},
  props:{/**接受父组件传值*/},
  name:'Role',
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
        /**权限抽屉数据 */
        roleDrawer:{
          /**显隐 */
          showHideDrawer:false,
          dataList:[],
          /**当前打开谁的权限 */
          currentRoleId:-1,
          /**要展开已拥有的节点 */
          checkedKeys:[],
          defaultProps: {
            children: 'children',
            label: 'authName'
          },
          // from:{}
        }
        
      },
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    this.getRloes()
  },
  methods: {/**所有方法*/
    /**用户列表*/
    async getRloes(currentPage,handleSize,keyword=''){
      const res = await this.$request.roles.getRloes()
      const {data,meta:{status,msg}} = res.data
      if(status == 200 ){
        this.table.dataList = data
      }else{ this.$message.error(msg) }
    },
    
    /**显隐抽屉 */
    showHideDrawerFn(row,$index,fn){
      if(this.table.roleDrawer.showHideDrawer){
        this.table.roleDrawer.showHideDrawer = false
        this.table.roleDrawer.dataList=[]
        this.table.roleDrawer.currentRoleId=-1
        this.table.roleDrawer.checkedKeys=[]
      }else{
        this.getRights(()=>{
          this.table.roleDrawer.currentRoleId = row.id
          this.table.roleDrawer.checkedKeys = treePush([],row.children)
          this.table.roleDrawer.showHideDrawer = true
        })
      }
      return typeof fn == 'function' && fn()
      /**递归 */
      function treePush(arr,data){
        data.forEach((item) => {
          if('children' in item){
            treePush(arr,item.children)
          }else{
            arr.push(item.id)
          }
        })
        return arr
      }
    },
    /**关闭抽屉前的回调 */
    closeDrawer(done){
      this.$confirm('确定要关闭抽屉吗？')
      .then(()=> {done();})
      .catch(()=> {});
    },
    /**权限树*/
    async getRights(fn){
      const res = await this.$request.roles.getRights({type:'tree'})
      const {data,meta:{msg,status}} = res.data
      if(status == 200){
        this.table.roleDrawer.dataList = data
        return typeof fn == 'function' && fn()
      }else{ this.$message.error(msg) }
    },
    /**提交权限 */
    async selectRole(){
      const checkedKeys = this.$refs.roleTree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
      const concatArray = [...checkedKeys,...halfCheckedKeys]
      const res = await this.$request.roles.setRoles({roleId:this.table.roleDrawer.currentRoleId,rids:concatArray.join(',')})
      const {data,meta:{msg,status}} = res.data
      if(status == 200){
        this.$message.success(msg)
        this.showHideDrawerFn('','',()=>{
          this.getRloes()
        })
      }else{ this.$message.error(msg) }
    },
    /**刷新 */
    async refresh(){
      try{
        if(this.table.dataList.length == 0){
          this.getRloes()
        }else{
          this.getRloes()
        }
        this.$notify.success({ title: '刷新成功', message: '最新数据已到达' });
      }catch(e){
        this.$notify.error({ title: '刷新失败', message: e });
      }
    },
    search(){
      if(this.table.keyword != ''){
        this.getRloes()
        return
      }
      if(this.table.keyword == '' && this.table.dataList.length == 0){
        this.getRloes()
        return
      }
      this.$message.error('请输入搜索内容')
    },
    /**增 */
    async addUsers(){
      const res = await this.$request.user.addUsers(this.table.addEdit.form)
      const {status,msg} = res.data.meta
      if(status == 201){
        this.$message.success(msg)
        this.showHideForm('','',0,()=>{
          this.getRloes()
        })
      }else{
        this.$message.error(msg)
      }
    },
    /**点击多选框 */
    selectionChange(val) {
      this.table.multipleSelection = val;
    },
    /**多选删除 */
    selectionDelete(){
      if(this.table.multipleSelection.length == 0){
        this.$message.error('未选中数据'); return
      }
      //这里写多删接口
      this.table.visible = false
    },
    /**删 */
    async del(item,index){
      const res = await this.$request.user.deleteUsers({id:item.id})
      const {status,msg} = res.data.meta
      if(status == 200){
        this.$notify.success({ title: msg, message: '最新数据已到达' });
        if(this.table.dataList.length > 1){
          this.getRloes()
        }else{
          if(this.table.pagination.currentPage > 1){
            this.getRloes()
          }else{
            this.getRloes()
          }
        }
      }else{this.$notify.error({ title:'失败' , message: msg });}
    },
    /**
     * 显示添加编辑弹窗
     * @param {当前行的数据} item 
     * @param {当前行的下标} index 
     * @param {1:添加 0:编辑} from 
     * @param {回调方法} fn 
     */
    showHideForm(item,index,from = 1,fn){
      /**添加 */
      if(from == 1){
        if(this.table.addEdit.addEditDialogVisible){
          this.table.addEdit.addEditDialogVisible = false
        }else{
          this.table.addEdit.addEditDialogVisible = true
        }
        this.table.addEdit.form = {}
        return typeof fn =='function' && fn(item,index)
      }
      /**编辑 */
      if(from == 0){
        if(this.table.addEdit.addEditDialogVisible){
          this.table.addEdit.addEditDialogVisible = false
          setTimeout(()=>{this.table.addEdit.form = {}},500)
        }else{
          this.table.addEdit.form = {...item}
          this.table.addEdit.addEditDialogVisible = true
        }
        return typeof fn =='function' && fn(item,index)
      }
    },
    /**改 */
    async edit(){
      console.log(`点击了编辑`);
      const res = await this.$request.user.updateUsers(this.table.addEdit.form)
      const {status,msg} = res.data.meta
      if(status == 200){
        this.$message.success(msg)
        this.showHideForm('','',0,()=>{
          this.getRloes()
        })
      }else{
        this.$message.error(msg)
      }
    },

    /**开关 */
    async switchStatus(item){
      console.log(item);
      const res = await this.$request.user.updateUsersStatus(item)
      const {status,msg} = res.data.meta
      if(status == 200){
        this.$message.success(msg)
      }else{this.$message.error(msg)
        this.showHideForm('','',0,()=>{
          this.getRloes()
        })
      }
    },
    /**分页 切换每页条数 */
    handleSizeChange(val) {
      this.getRloes()
    },
    /**分页 切换页码 */
    handleCurrentChange(val) {
      this.getRloes()
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
  .cursor{ cursor:pointer;}

</style>