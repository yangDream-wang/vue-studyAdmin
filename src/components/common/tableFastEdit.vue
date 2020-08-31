<!--
  功能：Element Table 快速编辑
  作者：兜兜里有糖
  邮箱：麋鹿不迷路@糖.兜兜
  时间：2020-08-31 09:30:08
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div class='tableFastEdit'>
    <el-popover placement="top-start" width="250" trigger="click" @show="fastEdit(row, column)"> 
      <div class="flex align-center width-100">
        <div class="width-60 padding-right-sm"><el-input v-model="table.fastForm.editData" size="mini" clearable prefix-icon="el-icon-edit" @keyup.enter.native="fastEditSubmit(index,column.id)"></el-input></div>
        <div class="width-40">
          <el-button-group>
            <el-button type="success" :loading="table.loading" icon="el-icon-check" size="mini" @click="fastEditSubmit(index,column.id)"></el-button>
            <el-button type="info" icon="el-icon-close" size="mini" plain @click="fastEditReset(index,column.id)"></el-button>
          </el-button-group>
        </div>
      </div>
      <el-button type="text" slot="reference" :id="'popover' + index + column.id">{{row[type]}}</el-button>
    </el-popover>
  </div>
</template>
<script>
//这里可以import(导入)其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  components: {},
  props:{/**接受父组件传值*/ 
      /**当前行的数据 */
      row:{
        type:Object,
        required:true,
        default:()=>{}
      }
      /**当前列,主要用id */
      ,column:{
        type:Object,
        required:true,
        default:()=>{}
      }
      /**当前第几行下标 */
      ,index:{
        type:Number,
        required:true,
        default:()=>-1
      }
      /**要编辑的字段 */
      ,type:{
        type:String,
        required:true,
        default:()=>''
      }
      /**最终数据中是否返回原数据 */
      ,origin:{
        type:[Boolean,String],
        default:()=>false
      }
      /**输入框初始化值 */
      ,value:{
        type:[Boolean,String],
        default:()=>true
      }
  },
  name:'tableFastEdit',
  data() {
    return {
      table:{
        fastForm:{editData:''},
        loading:false,
      },
    };
  },
  computed: {/**计算属性*/ },
  watch: {/**监听data数据变化*/ },
  created() {/**创建组件时执行(加载完成之前执行可以调用this,主要预处理数据)*/

  },
  methods: {/**所有方法*/
    /**快改 */
    fastEdit(row, column){
      this.table.fastForm = this.value === 'true' || this.value === true ? {editData:row[this.type]}: {editData:''}
      const {id} = row
      const {property} = column
      const fromDate = row[property]
      const fastEditData = { id:id, field:property, originData:fromDate }
      this.table.fastForm = {...this.table.fastForm,...fastEditData}
    },
    /**快改提交 */
    fastEditSubmit(index,id){
      if(this.table.fastForm.length <= 1){this.$message.error('快速编辑失败');return}
      if(!this.table.fastForm.editData){this.$message.error('请输入数据!');return}
      if(this.table.fastForm.originData == this.table.fastForm.editData){this.$message.info('数据相同不会更改哦');return}
      if(!this.origin){if(this.table.fastForm.hasOwnProperty('originData')){delete this.table.fastForm.originData}}
      this.table.fastForm.current = {index:index,id:id}
      this.table.loading = true
      // console.log(`提交的编辑数据`,this.table.fastForm);/**提交的编辑数据 */
      this.$emit('fastEditSubmit',this.table.fastForm)
    },
    /**父组件异步调用关闭该子组件 */
    done(index,id){
      this.imitateClick(index,id)
    },
    /**快改 模拟点击方法*/
    imitateClick(index,id,fn){
      this.table.loading = false
      var e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      document.getElementById('popover'+index+id).dispatchEvent(e)
      return typeof fn == 'function' && fn()
    },
    /**快改取消 */
    fastEditReset(index,id){
      this.imitateClick(index,id,()=>{
        // this.$notify.info({title:'通知',message: '已取消快速修改'});
      })
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