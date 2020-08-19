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
  <div class='Users height-100'>
    <div class="width-100 bg-white padding-lr-sm">
      <div class="width-100 flex justify-between">
        <div class="flex padding-tb-sm">
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
      @cell-click="fastEdit":点击某一个单元格事件
      
      -->
      <el-table id="table" ref="table" :data="table.dataList" highlight-current-row stripe border @selection-change="selectionChange" @cell-click="fastEdit">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" sortable label="ID" width="100"/>
        <el-table-column prop="username" label="姓名"/>
        <el-table-column prop="role_name" label="角色"/>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column label="创建时间" sortable prop="create_time">
          <template slot-scope="{row}">
            {{row.create_time | forDate(1)}}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="{row}">
            <el-switch v-model="row.mg_state" active-color="#13ce66" inactive-color="#CCCCCC" @change="switchStatus(row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200" max-width="300">
          <template slot-scope="{row,$index}">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="showHideForm(row,$index,0)" style="margin-right:10px;"></el-button>
            <el-popconfirm confirmButtonText='删除' cancelButtonText='再想想' icon="el-icon-info" iconColor="red" title="确定删除吗？" @onConfirm="del(row,$index)">
              <el-button slot="reference" type="danger" icon="el-icon-delete" circle plain></el-button>
            </el-popconfirm>
            <el-button type="success" icon="el-icon-check" circle plain style="margin-left:10px;" @click="roleshowHide(row,$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="width-100 padding-sm flex justify-end">
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
      <!-- 添加编辑表单 start -->
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
    <!-- 添加编辑表单 end -->

    <el-dialog title="分配角色" :visible.sync="table.roleDialogVisible" width="30%" center>
      <div class="width-100 flex-center">
        <el-form :model="table.roleForm">
          <el-form-item label="名称">
            <el-input v-model="table.roleForm.userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色分配">
            <el-select v-model="table.roleForm.selectValue" @change="select">
              <el-option label="请选择" :value="-1" v-if="table.roleForm.selectValue == -1"></el-option>
              <el-option :label="item.roleName" :value="item.id" v-for="item in table.roleForm.roles" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleshowHide">取 消</el-button>
        <el-button type="primary" @click="setUserRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import ExportExcel from 'plugins/exportExcel'
export default {
  components: {},
  props:{/**接受父组件传值*/ },
  name:'Users',
  data() {
    return {
      table:{
        /**搜索 */
        keyword:'',
        /**表格数据源 */
        dataList:[],
        /**显隐角色分配 */
        roleDialogVisible:false,
        roleForm:{ userInfo:{ userInfo:'' },selectValue:''},

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
        pagination:{
          /**当前页码 */
          currentPage:1,
          /**显示每页多少条 */
          handleSize:10,
          /**共有多少条 */
          total:0
        },
      },
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/
    this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize)
  },
  methods: {/**所有方法*/
    /**用户列表*/
    async getUsers(currentPage,handleSize,keyword=''){
      const res = await this.$request.user.getUsers({pagenum:currentPage,pagesize:handleSize,query:keyword == '' ? '':keyword})
      const {users,total} = res.data.data
      this.table.dataList = users,
      this.table.pagination.total = total
    },
    /**刷新 */
    async refresh(){
      try{
        if(this.table.dataList.length == 0){
          this.getUsers(1,this.table.pagination.handleSize)
        }else{
          this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize)
        }
        this.$notify.success({ title: '刷新成功', message: '最新数据已到达' });
      }catch(e){
        this.$notify.error({ title: '刷新失败', message: e });
      }
    },
    
    /**增 */
    async addUsers(){
      const res = await this.$request.user.addUsers(this.table.addEdit.form)
      const {status,msg} = res.data.meta
      if(status == 201){
        this.$message.success(msg)
        this.showHideForm('','',0,()=>{
          this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize)
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
          this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize)
        }else{
          if(this.table.pagination.currentPage > 1){
            this.getUsers(this.table.pagination.currentPage - 1,this.table.pagination.handleSize)
          }else{
            this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize)
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
          this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize)
        })
      }else{
        this.$message.error(msg)
      }
    },
    /**快改 */
    fastEdit(row, column){
      // const {id} = row
      // const {property} = column
      // const fromDate = row[property]
      // console.log(id);
      // console.log(property);
      // console.log(fromDate);
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
          this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize)
        })
      }
    },
    /**权限弹窗显隐 */
    roleshowHide(row,index){
      if(!this.table.roleDialogVisible){
        this.table.roleForm.userInfo = row
        this.getRoles(row,(res)=>{
          this.table.roleDialogVisible = true
        })
      }else{
        this.table.roleForm = { userInfo:{ userInfo:'' },selectValue:''},
        this.table.roleDialogVisible = false
      }
    },
    /**获取权限列表 */
    async getRoles(row,fn){
      const res = await this.$request.user.getRoles()
      const {data,meta:{status,msg}} = res.data
      this.table.roleForm.roles = data
      const userInfo = await this.$request.user.getUserInfo(row)
      const {rid} = userInfo.data.data
      this.table.roleForm.selectValue = rid
      return typeof fn == 'function' && fn()
    },

    /**选中 */
    select(e){
      this.table.roleForm.selectValue = e
    },
    /**分配角色 */
    async setUserRole(){
      let param = {}
      const res = await this.$request.user.setUserRole(Object.assign(param,this.table.roleForm.userInfo,{rid:this.table.roleForm.selectValue}))
      const {data,meta:{status,msg}} = res.data
      if(status == 200){
        this.$message.success(msg)
        this.roleshowHide()
        this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize,this.table.keyword)
      }
    },
    /**搜索 */
    search(){
      if(this.table.keyword != ''){
        this.getUsers(this.table.pagination.currentPage,this.table.pagination.handleSize,this.table.keyword)
        return
      }
      if(this.table.keyword == '' && this.table.dataList.length == 0){
        this.getUsers(1,this.table.pagination.handleSize)
        return
      }
      this.$message.error('请输入搜索内容')
    },
    /**分页 切换每页条数 */
    handleSizeChange(val) {
      this.getUsers(this.table.pagination.currentPage,val)
    },
    /**分页 切换页码 */
    handleCurrentChange(val) {
      this.getUsers(val,this.table.pagination.handleSize)
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