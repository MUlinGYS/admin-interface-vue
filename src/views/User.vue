<template>
  <div class="manage">
    <!-- 验证表单内容 -->
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增按钮 -->
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd()">+ 新增</el-button>
      <!-- from的搜索区域 -->
      <el-form :inline="true" :model="userFrom">
        <el-form-item>
          <el-input v-model="userFrom.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表单 -->
    <div class="common-table">
      <el-table stripe height="95%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 5px">{{
              scope.row.sex == 1 ? '男' : '女'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="mini"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="handleDelete(scope.row)"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api/Home'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        birth: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        addr: [{ required: true, message: '请填写地址', trigger: 'blur' }],
      },
      tableData: [],
      modalType: 0, //0表示新增的弹窗，1表示编辑
      total: 0, //当前总条数默认0
      pageData: {
        page: 1,
        limit: 10,
      },
      userFrom: {
        name: '',
      },
    }
  },
  methods: {
    //用户提交表单
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid) //表单选完选项为true，未选完为false
        if (valid) {
          if (this.modalType == 0) {
            addUser(this.form).then(() => {
              //重新获取列表接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              //重新获取列表接口
              this.getList()
            })
          }
          //清空表单数据
          this.$refs.form.resetFields()
          //关闭弹窗
          this.dialogVisible = false
        }
      })
    },

    //弹窗关闭时
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },

    handleEdit(row) {
      this.dialogVisible = true
      this.modalType = 1
      //需要对当天行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    handleAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },

    //获取列表数据
    getList() {
      getUser({ params: { ...this.userFrom, ...this.pageData } }).then(
        ({ data }) => {
          this.tableData = data.list
          this.total = data.count || 0
        },
      )
    },

    //选择页码时的回调函数
    handlePage(val) {
      this.pageData.page = val
      this.getList()
    },

    onSubmit() {
      this.getList()
    },
  },
  mounted() {
    this.getList()
  },
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: -15px;
      right: 20px;
    }
  }
}
</style>
